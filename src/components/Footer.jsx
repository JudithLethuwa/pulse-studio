export default function Footer() {
  return (
    <footer id="contact" className="bg-ink px-5 pt-12 pb-6 text-[#f3e9ee]">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-8 md:flex-row md:justify-between">
        <div className="md:flex-1">
          <h2 className="mb-3 font-heading text-2xl text-white">Pulse Studio</h2>
          <p>Your journey. Your pace. Your studio.</p>
        </div>
        <div className="md:flex-1">
          <h3 className="mb-3 text-lg font-semibold text-pink">Visit us</h3>
          <address className="not-italic">
            12 Example Street
            <br />
            Johannesburg, Gauteng
          </address>
        </div>
        <div className="md:flex-1">
          <h3 className="mb-3 text-lg font-semibold text-pink">Get in touch</h3>
          <p>
            <a
              href="mailto:hello@pulsestudio.example"
              className="break-words text-pink hover:text-white"
            >
              hello@pulsestudio.example
            </a>
          </p>
          <p>Mon to Fri 05:30 to 20:00. Sat 08:00 to 13:00.</p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-[1100px] border-t border-white/20 pt-4 text-sm text-white/60">
        &copy; 2026 Pulse Studio. All rights reserved.
      </p>
    </footer>
  )
}