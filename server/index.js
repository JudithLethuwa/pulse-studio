import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node'
import { pool } from './db.js'
import { auth } from './auth.js'
import contentRouter from './routes/content.js'
import ordersRouter from './routes/orders.js'
import { stripeWebhook } from './routes/webhook.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
)

// Auth must come BEFORE express.json()
app.all('/api/auth/*splat', toNodeHandler(auth))

// Stripe webhook needs the RAW body, so it must also come BEFORE express.json()
app.post(
  '/api/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhook
)

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/db-check', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW() AS now')
    res.json({ connected: true, time: result.rows[0].now })
  } catch (err) {
    next(err)
  }
})

app.get('/api/me', async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })
    res.json(session)
  } catch (err) {
    next(err)
  }
})

app.use('/api', contentRouter)
app.use('/api/orders', ordersRouter)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong on the server' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})