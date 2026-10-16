import Header from './components/Header'
import Hero from './components/Hero'
import ClassesSection from './components/ClassesSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <ClassesSection />
      </main>
      <Footer />
    </div>
  )
}