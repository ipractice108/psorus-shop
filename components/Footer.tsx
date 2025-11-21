'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-green-900 to-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-2xl font-bold">Psorus</h3>
              </div>
              <p className="text-green-100">
                Натуральная забота о вашей коже
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Информация</h4>
              <ul className="space-y-2 text-green-100">
                <li>
                  <a href="#product" className="hover:text-white transition-colors">
                    О продукте
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-white transition-colors">
                    Преимущества
                  </a>
                </li>
                <li>
                  <a href="#order" className="hover:text-white transition-colors">
                    Заказать
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Контакты</h4>
              <p className="text-green-100">
                Доставка по всей России<br />
                Оплата при получении
              </p>
            </div>
          </div>

          <div className="border-t border-green-700 pt-8 text-center text-green-100">
            <p>&copy; {currentYear} Psorus.com. Все права защищены.</p>
            <p className="mt-2 text-sm">
              Здоровье начинается с заботы о себе 💚
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
