import { useState } from 'react'
import { classes, journeys } from '../data/classes'
import ClassCard from './ClassCard'

const filters = [{ id: 'all', label: 'All classes' }, ...journeys]

export default function ClassesSection() {
  const [activeJourney, setActiveJourney] = useState('all')
  const [savedIds, setSavedIds] = useState([])

  const visibleClasses =
    activeJourney === 'all'
      ? classes
      : classes.filter((c) => c.journey === activeJourney)

  function toggleSaved(id) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    )
  }

  return (
    <section
      id="classes"
      aria-labelledby="classes-title"
      className="mx-auto max-w-[1100px] px-5 py-16"
    >
      <h2 id="classes-title" className="font-heading text-3xl font-bold sm:text-4xl">
        Class Schedule
      </h2>
      <p className="mt-2 mb-6 max-w-[60ch] text-muted">
        Pick your journey to see the classes that fit it, and save the ones you
        want in your week.
      </p>

      <div
        className="mb-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter classes by journey"
      >
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveJourney(f.id)}
            aria-pressed={activeJourney === f.id}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              activeJourney === f.id
                ? 'border-accent bg-accent text-white'
                : 'border-pink bg-white text-ink hover:bg-blush'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-muted" aria-live="polite">
        Showing {visibleClasses.length} classes · {savedIds.length} saved to
        your week
      </p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleClasses.map((item) => (
          <ClassCard
            key={item.id}
            item={item}
            saved={savedIds.includes(item.id)}
            onToggleSaved={() => toggleSaved(item.id)}
          />
        ))}
      </ul>
    </section>
  )
}
