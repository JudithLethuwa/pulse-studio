import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <section id="classes" className="px-5 py-16">
          <h2 className="font-heading text-3xl font-bold">Class Schedule</h2>
        </section>
      </main>
      <Footer />
    </div>
  )
}