import { Router } from 'express'
import Stripe from 'stripe'
import { pool } from '../db.js'
import { requireAuth } from '../middleware/requireAuth.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const router = Router()

// POST /api/orders/checkout   body: { planId }
router.post('/checkout', requireAuth, async (req, res, next) => {
  try {
    const { planId } = req.body

    // 1. Look up the REAL price in our database. We never trust the browser's price.
    const planResult = await pool.query(
      'SELECT id, name, price FROM plans WHERE id = $1',
      [planId]
    )
    const plan = planResult.rows[0]
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' })
    }

    const unitPriceCents = plan.price * 100 // Stripe works in cents

    // 2. Create the order. It starts as "pending".
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, status, total_cents, currency)
       VALUES ($1, 'pending', $2, 'zar') RETURNING id`,
      [req.user.id, unitPriceCents]
    )
    const orderId = orderResult.rows[0].id

    await pool.query(
      `INSERT INTO order_items (order_id, plan_id, name, unit_price_cents, quantity)
       VALUES ($1, $2, $3, $4, 1)`,
      [orderId, plan.id, plan.name, unitPriceCents]
    )

    // 3. Start a Stripe Checkout Session for this order.
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'zar',
            unit_amount: unitPriceCents,
            product_data: { name: `${plan.name} membership` },
          },
        },
      ],
      client_reference_id: String(orderId),
      metadata: { orderId: String(orderId) },
      success_url: `${process.env.CLIENT_URL}/?order=${orderId}`,
      cancel_url: `${process.env.CLIENT_URL}/#membership`,
    })

    await pool.query('UPDATE orders SET stripe_session_id = $1 WHERE id = $2', [
      session.id,
      orderId,
    ])

    // 4. Send the browser the Stripe page address.
    res.json({ url: session.url })
  } catch (err) {
    next(err)
  }
})

// GET /api/orders/:id  — the signed-in user's own order, with its items
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const orderId = Number(req.params.id)
    if (!Number.isInteger(orderId)) {
      return res.status(400).json({ error: 'Bad order id' })
    }

    const orderResult = await pool.query(
      `SELECT id, status, total_cents, currency, created_at, paid_at
       FROM orders WHERE id = $1 AND user_id = $2`,
      [orderId, req.user.id]
    )
    const order = orderResult.rows[0]
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    const itemsResult = await pool.query(
      `SELECT name, unit_price_cents, quantity FROM order_items WHERE order_id = $1`,
      [orderId]
    )

    res.json({ ...order, items: itemsResult.rows })
  } catch (err) {
    next(err)
  }
})

export default router