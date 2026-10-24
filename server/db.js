import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

// One shared pool of connections to the Postgres database
export const pool = new Pool({ connectionString: process.env.DATABASE_URL })