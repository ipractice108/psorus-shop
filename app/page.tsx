import Header from '@/components/Header'
import ProductHero from '@/components/ProductHero'
import Features from '@/components/Features'
import HealthSection from '@/components/HealthSection'
import OrderForm from '@/components/OrderForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <ProductHero />
      <Features />
      <HealthSection />
      <OrderForm />
      <Footer />
    </main>
  )
}
