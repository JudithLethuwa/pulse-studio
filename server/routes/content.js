import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

router.get('/journeys', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, label, tag_class AS "tagClass" FROM journeys ORDER BY position',
  )
  res.json(rows)
})

router.get('/classes', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, day, start_time AS time, name, journey_id AS journey FROM classes ORDER BY id',
  )
  res.json(rows)
})

router.get('/trainers', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, initials, specialty, bio, journey_id AS journey FROM trainers ORDER BY id',
  )
  res.json(rows)
})

router.get('/plans', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, price, tagline, features, featured FROM plans ORDER BY id',
  )
  res.json(rows)
})

export default router
