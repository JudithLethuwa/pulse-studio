import Header from './components/Header'
import Hero from './components/Hero'
import ClassesSection from './components/ClassesSection'
import TrainersSection from './components/TrainersSection'
import MembershipSection from './components/MembershipSection'
import Footer from './components/Footer'
import OrderSuccess from './components/OrderSuccess'

export default function App() {
  // Stripe sends people back to  /?order=12  after paying
  const orderId = new URLSearchParams(window.location.search).get('order')
  if (orderId) {
    return <OrderSuccess orderId={orderId} />
  }

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