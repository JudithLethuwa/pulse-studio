import Header from './components/Header'
import Hero from './components/Hero'
import ClassesSection from './components/ClassesSection'
import TrainersSection from './components/TrainersSection'
import MembershipSection from './components/MembershipSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <ClassesSection />
        <TrainersSection />
        <MembershipSection />
      </main>
      <Footer />
    </div>
  )
}