import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { pool } from './db.js'
import { journeys, classes } from './data/classes.js'
import { trainers } from './data/trainers.js'
import { plans } from './data/plans.js'

async function seed() {
  // 1. Build the tables from schema.sql
  const schema = await readFile(new URL('./schema.sql', import.meta.url), 'utf8')
  await pool.query(schema)

  // 2. Fill them with the data from the three data files
  for (const j of journeys) {
    await pool.query(
      'INSERT INTO journeys (id, label, tag_class) VALUES ($1, $2, $3)',
      [j.id, j.label, j.tagClass],
    )
  }

  for (const c of classes) {
    await pool.query(
      'INSERT INTO classes (day, start_time, name, journey_id) VALUES ($1, $2, $3, $4)',
      [c.day, c.time, c.name, c.journey],
    )
  }

  for (const t of trainers) {
    await pool.query(
      'INSERT INTO trainers (name, initials, specialty, bio, journey_id) VALUES ($1, $2, $3, $4, $5)',
      [t.name, t.initials, t.specialty, t.bio, t.journey],
    )
  }

  for (const p of plans) {
    await pool.query(
      'INSERT INTO plans (name, price, tagline, features, featured) VALUES ($1, $2, $3, $4, $5)',
      [p.name, Number(p.price.replace('R', '')), p.tagline, p.features, p.featured],
    )
  }

  console.log(
    `Seeded ${journeys.length} journeys, ${classes.length} classes, ${trainers.length} trainers, ${plans.length} plans`,
  )
  await pool.end()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})