import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { pool } from './db.js'

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})