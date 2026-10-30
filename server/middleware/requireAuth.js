import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../auth.js'

// Runs before a route. If nobody is signed in, stop with a 401 error.
export async function requireAuth(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (!session) {
      return res.status(401).json({ error: 'Please sign in first' })
    }

    req.user = session.user // the checkout route can now see who is buying
    next()
  } catch (err) {
    next(err)
  }
}