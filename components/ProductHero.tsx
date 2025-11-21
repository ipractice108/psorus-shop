'use client'

import Image from 'next/image'

export default function ProductHero() {
  return (
    <section id="product" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl p-8 card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-3xl opacity-50"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Placeholder для изображения продукта */}
                <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-100 rounded-2xl flex items-center justify-center">
                  <span className="text-8xl">🌿</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              Натуральный состав
            </div>

            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Нежная кожа
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Натуральное средство от псориаза
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Мягкая формула из китайских трав, созданная, чтобы поддержать кожу
              в комфорте и чистоте. Без гормонов. Без раздражения.
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
      </div>
    </section>
  )
}
