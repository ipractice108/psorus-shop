'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function ProductHero() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="product" className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl text-gray-600">Загрузка товаров...</div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section id="product" className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl text-gray-600">Нет доступных товаров</div>
        </div>
      </section>
    )
  }

  return (
    <section id="product" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl p-8 card-hover">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-3xl opacity-50"></div>
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-100 rounded-2xl flex flex-col items-center justify-center">
                        <span className="text-8xl">🌿</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Натуральный состав
                </div>

                <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h2>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.description}
                </p>

                <p className="text-3xl font-bold text-green-600">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="#order"
                    className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg text-center"
                  >
                    Купить сейчас
                  </a>
                  <a
                    href="#benefits"
                    className="border-2 border-green-500 text-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-colors text-center"
                  >
                    Узнать больше
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
