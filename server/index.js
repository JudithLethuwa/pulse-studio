import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { pool } from './db.js'
import contentRouter from './routes/content.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())

// Is the server alive?
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Can the server talk to the database?
app.get('/api/db-check', async (req, res) => {
  const result = await pool.query('SELECT NOW() AS now')
  res.json(result.rows[0])
})

// Our data routes: /api/journeys, /api/classes, /api/trainers, /api/plans
app.use('/api', contentRouter)

// If any route throws, send a JSON error instead of crashing
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})