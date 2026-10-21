export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
      {/* 1. Photo at the bottom layer */}
      <img
        src="/images/rowing-machines.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 2. Your pink gradient on top of the photo, slightly see-through */}
      <div className="absolute inset-0 bg-linear-to-br from-blush/85 to-pink/85" />

      {/* 3. Your text and button on top of everything */}
      <div className="relative z-10 flex flex-col items-center">
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
      </div>
    </section>
  )
}