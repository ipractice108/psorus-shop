'use client'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🌿</span>
            <h1 className="text-2xl font-bold text-green-800">Psorus</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#product" className="text-gray-700 hover:text-green-600 transition-colors">
              Продукт
            </a>
            <a href="#benefits" className="text-gray-700 hover:text-green-600 transition-colors">
              Преимущества
            </a>
            <a href="#order" className="text-gray-700 hover:text-green-600 transition-colors">
              Заказать
            </a>
          </nav>
          <a
            href="#order"
            className="gradient-button text-white px-6 py-2 rounded-full font-semibold"
          >
            Купить
          </a>
        </div>
      </div>
    </header>
  )
}
