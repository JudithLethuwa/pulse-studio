import 'dotenv/config'
import { betterAuth } from 'better-auth'
import { pool } from './db.js'

export const auth = betterAuth({
  // Store users and sessions in the same Postgres database
  database: pool,
  // Let people sign up and log in with email and password
  emailAndPassword: { enabled: true },
  // Browsers on these addresses may call the auth routes
  trustedOrigins: [process.env.CLIENT_URL],
})
