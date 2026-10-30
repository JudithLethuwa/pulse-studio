import { useEffect, useState } from 'react'

export default function OrderSuccess({ orderId }) {
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [gaveUp, setGaveUp] = useState(false)

  useEffect(() => {
    let cancelled = false
    let attempts = 0
    let timer

    // The webhook can arrive a moment after the redirect, so check a few times.
    async function check() {
      attempts += 1
      try {
        const res = await fetch(`/api/orders/${orderId}`, { credentials: 'include' })
        if (res.status === 401) {
          if (!cancelled) setError('Please sign in to see your order.')
          return
        }
        if (!res.ok) {
          if (!cancelled) setError('We could not find this order.')
          return
        }
        const data = await res.json()
        if (cancelled) return
        setOrder(data)

        if (data.status !== 'paid') {
          if (attempts < 10) timer = setTimeout(check, 2000)
          else setGaveUp(true)
        }
      } catch {
        if (!cancelled) setError('Something went wrong. Please refresh.')
      }
    }

    check()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [orderId])

  const paid = order?.status === 'paid'

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 bg-page px-5 py-16 text-ink">
      <h1 className="font-heading text-4xl font-bold">
        {paid ? 'Payment received' : 'Confirming your payment...'}
      </h1>

      {error && <p className="text-red-600">{error}</p>}

      {!error && !order && <p className="text-muted">Checking your order...</p>}

      {order && (
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="text-muted">Order #{order.id}</p>
          <p className="text-2xl font-semibold">
            {order.items.map((item) => item.name).join(', ')}
          </p>
          <p>Total: R{(order.total_cents / 100).toFixed(2)}</p>
          <p className="mt-2 font-semibold">
            Status: {paid ? 'Paid' : 'Waiting for confirmation'}
          </p>
        </div>
      )}

      {gaveUp && !paid && (
        <p className="text-muted">
          Still waiting for confirmation. Refresh this page in a moment.
        </p>
      )}

      <a href="/" className="font-semibold text-accent underline">
        Back to Pulse Studio
      </a>
    </main>
  )
}