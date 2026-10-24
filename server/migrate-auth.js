import { getMigrations } from 'better-auth/db/migration'
import { auth } from './auth.js'
import { pool } from './db.js'

// Ask Better Auth which tables are missing, then create them
const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options)

console.log('Tables to create:', toBeCreated.map((t) => t.table))
console.log('Fields to add:', toBeAdded.length)

await runMigrations()
console.log('Auth migration finished')

await pool.end()