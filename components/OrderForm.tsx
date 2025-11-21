'use client'

import { useState } from 'react'

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const pricePerItem = 2990 // цена за единицу в рублях
  const totalPrice = pricePerItem * quantity

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 5) {
      setQuantity(newQuantity)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      console.log('Отправка заказа...', { formData, quantity, totalPrice })

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          quantity,
          totalPrice,
          date: new Date().toISOString(),
        }),
      })

      console.log('Ответ от сервера:', response.status, response.ok)

      const data = await response.json()
      console.log('Данные ответа:', data)

      if (response.ok && data.success) {
        console.log('✅ Заказ успешно отправлен')
        setSubmitStatus('success')
        setFormData({ name: '', phone: '', email: '', address: '' })
        setQuantity(1)
      } else {
        console.error('❌ Ошибка:', data)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting order:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <section id="order" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-white p-12 rounded-3xl shadow-xl text-center border-2 border-green-200">
              <div className="text-7xl mb-6">💚</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Спасибо за заказ!
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Мы скоро свяжемся с вами, чтобы уточнить детали.
              </p>
              <p className="text-xl text-green-700 font-semibold">
                Помните: здоровье начинается с заботы о себе 💚
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="mt-8 gradient-button text-white px-8 py-3 rounded-full font-semibold"
              >
                Оформить ещё заказ
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="order" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Оформить заказ
            </h2>
            <p className="text-xl text-gray-600">
              Оплата наложенным платежом при получении
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl shadow-xl">
            {/* Корзина */}
            <div className="bg-white p-6 rounded-2xl mb-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ваш заказ
              </h3>

              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-200 to-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      Нежная кожа
                    </h4>
                    <p className="text-gray-600">
                      {pricePerItem.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold hover:bg-green-200 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-900 w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold hover:bg-green-200 transition-colors"
                    disabled={quantity >= 5}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900">
                  Итого:
                </span>
                <span className="text-3xl font-bold text-green-600">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                  Адрес доставки *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors resize-none"
                  placeholder="Город, улица, дом, квартира"
                />
              </div>

              {submitStatus === 'error' && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  Произошла ошибка при отправке заказа. Попробуйте ещё раз.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-button text-white px-8 py-4 rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заказ'}
              </button>

              <p className="text-sm text-gray-600 text-center">
                * Оплата производится наложенным платежом при получении товара
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
