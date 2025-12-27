'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  featured?: boolean
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Проверка авторизации при загрузке
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth')
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
      if (data.authenticated) {
        loadProducts()
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setIsAuthenticated(true)
        loadProducts()
      } else {
        setError(data.error || 'Ошибка входа')
      }
    } catch (error) {
      setError('Ошибка сервера')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const handleSaveProduct = async (product: Partial<Product>) => {
    try {
      const url = '/api/admin/products'
      const method = product.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })

      if (res.ok) {
        await loadProducts()
        setEditingProduct(null)
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Ошибка при сохранении товара')
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Удалить этот товар?')) return

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        await loadProducts()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Ошибка при удалении товара')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <span className="text-5xl">🔐</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Админ-панель</h1>
            <p className="text-gray-600 mt-2">Psorus.com</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                placeholder="admin@psorus.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full gradient-button text-white px-6 py-3 rounded-full font-semibold text-lg"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🌿</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
                <p className="text-sm text-gray-600">Управление товарами</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                🌐 Открыть сайт
              </a>
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => {
              setIsCreating(true)
              setEditingProduct({
                id: '',
                name: '',
                description: '',
                price: 0,
                image: '',
              })
            }}
            className="gradient-button text-white px-6 py-3 rounded-full font-semibold"
          >
            + Добавить товар
          </button>
        </div>

        {(isCreating || editingProduct) && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setEditingProduct(null)
              setIsCreating(false)
            }}
          />
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => setEditingProduct(product)}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
        </div>

        {products.length === 0 && !isCreating && (
          <div className="text-center py-12 text-gray-500">
            Нет товаров. Добавьте первый товар!
          </div>
        )}
      </main>
    </div>
  )
}

function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
      <div className="aspect-square bg-gray-100 relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">📦</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-green-600 mb-4">
          {product.price.toLocaleString('ru-RU')} ₽
        </p>

        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Редактировать
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null
  onSave: (product: Partial<Product>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    image: product?.image || '',
  })
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formDataObj = new FormData()
    formDataObj.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataObj,
      })

      const data = await res.json()
      if (res.ok) {
        setFormData({ ...formData, image: data.url })
      } else {
        alert('Ошибка загрузки изображения')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Ошибка загрузки')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {product?.id ? 'Редактировать товар' : 'Новый товар'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Название товара *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
            placeholder="Нежная кожа"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Описание *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none resize-none"
            placeholder="Описание товара..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Цена (₽) *
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
            required
            min="0"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
            placeholder="2990"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Фотография товара
          </label>

          {formData.image && (
            <div className="mb-4">
              <img
                src={formData.image}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-xl"
              />
            </div>
          )}

          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={`cursor-pointer bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? 'Загрузка...' : formData.image ? 'Изменить фото' : 'Добавить фото'}
            </label>

            {formData.image && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: '' })}
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Удалить фото
              </button>
            )}
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 gradient-button text-white px-6 py-3 rounded-full font-semibold text-lg"
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-full font-semibold text-lg transition-colors"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}
