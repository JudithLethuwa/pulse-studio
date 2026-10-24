export default function SaveToggle({ saved, onChange, label }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={saved}
      aria-label={`Add ${label} to my week`}
      className={`mt-auto rounded-full border px-4 py-2 text-sm font-semibold ${
        saved
          ? 'border-ink bg-ink text-white'
          : 'border-accent text-accent hover:bg-blush'
      }`}
    >
      {saved ? '✓ In my week' : '+ Add to my week'}
    </button>
  )
}
