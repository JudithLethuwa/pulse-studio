import { journeys } from '../data/classes'
import SaveToggle from './SaveToggle'

export default function ClassCard({ item, saved, onToggleSaved }) {
  const journey = journeys.find((j) => j.id === item.journey)

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 shadow-md shadow-accent/10">
      <div>
        <p className="text-sm font-semibold text-accent">
          {item.day} · {item.time}
        </p>
        <h3 className="font-heading text-xl font-bold">{item.name}</h3>
      </div>
      <span
        className={`self-start rounded-full px-3 py-0.5 text-xs font-semibold ${journey.tagClass}`}
      >
        {journey.label}
      </span>
      <SaveToggle saved={saved} onChange={onToggleSaved} label={item.name} />
    </li>
  )
}