export default function Hero() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-linear-to-br from-blush to-pink px-5 py-16 text-center">
      <h1 className="mb-4 max-w-[18ch] font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
        Your journey. Your pace. Your studio.
      </h1>
      <p className="mb-8 max-w-[55ch] text-lg text-muted">
        Whether you want to lose weight, build muscle, gain strength or simply
        start moving, we'll meet you where you are.
      </p>
      <a
        href="#classes"
        className="rounded-full bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
      >
        Find your journey
      </a>
    </section>
  )
}