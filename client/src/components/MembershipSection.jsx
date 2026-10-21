import { plans } from '../data/plans'

export default function MembershipSection() {
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
              {plan.price}
              <span className="font-body text-base font-normal opacity-70"> /month</span>
            </p>
            <p className={`mb-5 ${plan.featured ? 'text-white/80' : 'text-muted'}`}>
              {plan.tagline}
            </p>
            <ul className="mb-6 flex flex-1 flex-col gap-2">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span
                    aria-hidden="true"
                    className={`mr-2 font-bold ${plan.featured ? 'text-pink' : 'text-accent'}`}
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`rounded-full px-6 py-3 text-center font-semibold ${
                plan.featured
                  ? 'bg-pink text-ink hover:bg-white'
                  : 'bg-accent text-white hover:bg-accent-dark'
              }`}
            >
              Choose {plan.name}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}