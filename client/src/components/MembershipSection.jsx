import { useState } from 'react'
import useApi from '../hooks/useApi'
import { authClient } from '../lib/auth-client'

export default function MembershipSection() {
  const { data: plans, error } = useApi('/api/plans')
  const { data: session } = authClient.useSession()
  const [busyPlanId, setBusyPlanId] = useState(null)
  const [message, setMessage] = useState('')

  async function startCheckout(planId) {
    setMessage('')

    if (!session) {
      setMessage('Please sign in first, then choose your plan.')
      return
    }

    setBusyPlanId(planId)
    try {
      // We only send the plan id. The server looks up the real price itself.
      const res = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId }),
      })

      if (res.status === 401) {
        setMessage('Please sign in first, then choose your plan.')
        setBusyPlanId(null)
        return
      }
      if (!res.ok) throw new Error('Checkout failed')

      const { url } = await res.json()
      window.location.href = url // go to Stripe's hosted checkout page
    } catch {
      setMessage('Could not start checkout. Please try again.')
      setBusyPlanId(null)
    }
  }

  if (error || !plans) {
    return (
      <section id="membership" className="mx-auto max-w-[1100px] px-5 py-16">
        <p className="text-muted">
          {error ? 'Could not load plans.' : 'Loading plans...'}
        </p>
      </section>
    )
  }

  return (
    <section
      id="membership"
      aria-labelledby="membership-title"
      className="mx-auto max-w-[1100px] px-5 py-16"
    >
      <h2 id="membership-title" className="font-heading text-3xl font-bold sm:text-4xl">
        Membership Tiers
      </h2>
      <p className="mt-2 mb-8 max-w-[60ch] text-muted">
        Simple monthly plans. No joining fee, cancel any time.
      </p>

      {message && (
        <p role="alert" className="mb-6 rounded-lg bg-blush px-4 py-3 font-semibold text-ink">
          {message}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`flex w-full max-w-[340px] flex-1 basis-[260px] flex-col rounded-2xl border p-6 shadow-md shadow-accent/10 ${
              plan.featured
                ? 'border-ink bg-ink text-white'
                : 'border-line bg-white'
            }`}
          >
            {plan.featured && (
              <p className="mb-3 self-start rounded-full bg-pink px-3 py-0.5 text-xs font-semibold text-ink">
                Most popular
              </p>
            )}
            <h3 className="font-heading text-2xl font-bold">{plan.name}</h3>
            <p
              className={`mt-2 font-heading text-4xl font-bold ${
                plan.featured ? 'text-pink' : 'text-accent'
              }`}
            >
              R{plan.price}
              <span className="font-body text-base font-normal opacity-70">
                {' '}
                /month
              </span>
            </p>
            <p className={`mb-5 ${plan.featured ? 'text-white/80' : 'text-muted'}`}>
              {plan.tagline}
            </p>
            <ul className="mb-6 flex flex-1 flex-col gap-2">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span
                    aria-hidden="true"
                    className={`mr-2 font-bold ${
                      plan.featured ? 'text-pink' : 'text-accent'
                    }`}
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              aria-label={`Join ${plan.name}`}
              disabled={busyPlanId !== null}
              onClick={() => startCheckout(plan.id)}
              className={`rounded-full px-6 py-3 text-center font-semibold disabled:opacity-60 ${
                plan.featured
                  ? 'bg-pink text-ink hover:bg-white'
                  : 'bg-accent text-white hover:bg-accent-dark'
              }`}
            >
              {busyPlanId === plan.id ? 'Taking you to Stripe...' : 'Join now'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}