import Stripe from 'stripe'
import { pool } from '../db.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Stripe calls this after a payment. It is the ONLY place an order becomes "paid".
export async function stripeWebhook(req, res) {
  const signature = req.headers['stripe-signature']

  // 1. Check the message really came from Stripe (not someone pretending)
  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature check failed:', err.message)
    return res.status(400).send(`Webhook error: ${err.message}`)
  }

  // 2. React to the event
  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      if (session.payment_status === 'paid') {
        await pool.query(
          `UPDATE orders SET status = 'paid', paid_at = NOW()
           WHERE stripe_session_id = $1 AND status <> 'paid'`,
          [session.id]
        )
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object
      await pool.query(
        `UPDATE orders SET status = 'expired'
         WHERE stripe_session_id = $1 AND status = 'pending'`,
        [session.id]
      )
    }

    res.json({ received: true })
  } catch (err) {
    console.error(err)
    res.status(500).send('Webhook handler failed')
  }
}