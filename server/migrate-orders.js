import fs from 'node:fs'
import { pool } from './db.js'

const sql = fs.readFileSync(new URL('./orders-schema.sql', import.meta.url), 'utf8')

await pool.query(sql)
console.log('Orders tables are ready')
await pool.end()