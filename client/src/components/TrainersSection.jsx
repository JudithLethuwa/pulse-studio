import { trainers } from '../data/trainers'
import { journeys } from '../data/classes'

export default function TrainersSection() {
  return (
    <section
      id="trainers"
      aria-labelledby="trainers-title"
      className="mx-auto max-w-[1100px] px-5 py-16"
    >
      <h2 id="trainers-title" className="font-heading text-3xl font-bold sm:text-4xl">
        Meet the Trainers
      </h2>
      <p className="mt-2 mb-8 max-w-[60ch] text-muted">
        Real coaches with real specialties. Find the one who matches your journey.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((trainer) => {
          const journey = journeys.find((j) => j.id === trainer.journey)
          return (
            <article
              key={trainer.id}
              className="flex flex-col items-center rounded-2xl border border-line bg-white p-6 text-center shadow-md shadow-accent/10"
            >
              <div
                aria-hidden="true"
                className="mb-4 flex size-20 items-center justify-center rounded-full bg-linear-to-br from-pink to-accent font-heading text-2xl font-bold text-white"
              >
                {trainer.initials}
              </div>
              <h3 className="font-heading text-xl font-bold">{trainer.name}</h3>
              <p className="mt-1 mb-3 text-sm font-semibold text-accent">
                {trainer.specialty}
              </p>
              <p className="mb-4 flex-1 text-muted">{trainer.bio}</p>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-semibold ${journey.tagClass}`}
              >
                {journey.label}
              </span>
            </article>
          )
        })}
      </div>
    </section>
  )
}