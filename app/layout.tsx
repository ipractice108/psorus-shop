import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import YandexMetrika from '@/components/YandexMetrika'

export const metadata: Metadata = {
  title: 'Нежная кожа - Натуральное средство от псориаза | Psorus.com',
  description: 'Мягкая формула из китайских трав, созданная для поддержания здоровья кожи. Без гормонов. Без раздражения. Проверено традиционной китайской медициной.',
  keywords: 'псориаз, лечение псориаза, китайское средство от псориаза, натуральное средство, Нежная кожа, китайская медицина, средство для кожи, купить средство от псориаза, доставка по России',
  authors: [{ name: 'Psorus' }],
  openGraph: {
    title: 'Нежная кожа - Натуральное средство от псориаза',
    description: 'Мягкая формула из китайских трав для здоровья вашей кожи',
    url: 'https://psorus.com',
    siteName: 'Psorus',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    yandex: 'yandex-verification-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Нежная кожа',
  description: 'Натуральное средство от псориаза на основе китайских трав',
  image: 'https://psorus.com/product-image.jpg',
  brand: {
    '@type': 'Brand',
    name: 'Psorus',
  },
  offers: {
    '@type': 'Offer',
    price: '2990',
    priceCurrency: 'RUB',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Psorus',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="yandex-verification" content="yandex-verification-code" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <YandexMetrika />
      </body>
    </html>
  )
}
