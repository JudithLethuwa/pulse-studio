import { useState } from 'react'
import { authClient } from '../lib/auth-client'

export default function AuthForm({ onDone }) {
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result =
      mode === 'signup'
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (result.error) {
      setError(result.error.message || 'Something went wrong')
      return
    }
    onDone()
  }

  const inputClass =
    'w-full rounded-lg border border-line bg-white px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-accent'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="font-heading text-2xl text-ink">
        {mode === 'signup' ? 'Create your account' : 'Welcome back'}
      </h2>

      {mode === 'signup' && (
        <input
          className={inputClass}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        className={inputClass}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className={inputClass}
        type="password"
        placeholder="Password (8+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={8}
        required
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-accent px-4 py-2 font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
      >
        {loading ? 'Please wait...' : mode === 'signup' ? 'Sign up' : 'Sign in'}
      </button>

      <button
        type="button"
        onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
        className="text-sm text-muted underline"
      >
        {mode === 'signup'
          ? 'Already have an account? Sign in'
          : 'New here? Create an account'}
      </button>
    </form>
  )
}