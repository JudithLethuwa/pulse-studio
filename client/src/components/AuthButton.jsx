import { useState } from 'react'
import { createPortal } from 'react-dom'
import { authClient } from '../lib/auth-client'
import AuthForm from './AuthForm'

export default function AuthButton() {
  const { data: session, isPending } = authClient.useSession()
  const [open, setOpen] = useState(false)

  if (isPending) return null

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-ink">Hi, {session.user.name}</span>
        <button
          onClick={() => authClient.signOut()}
          className="rounded-full border border-accent px-4 py-1.5 text-sm font-semibold text-accent hover:bg-blush"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-white hover:bg-accent-dark"
      >
        Sign in
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-page p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AuthForm onDone={() => setOpen(false)} />
              <button
                onClick={() => setOpen(false)}
                className="mt-3 w-full text-sm text-muted"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}