import AuthButton from './AuthButton'

const links = [
  { label: 'Classes', href: '#classes' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line bg-white px-5 py-4">
      <a href="#top" className="font-heading text-2xl font-bold">
        Pulse Studio
      </a>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-semibold">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="border-b-2 border-transparent hover:border-accent hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <AuthButton />
      </div>
    </header>
  )
}