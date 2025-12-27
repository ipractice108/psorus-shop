import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json')

// Проверка авторизации
function checkAuth() {
  const session = cookies().get('admin_session')
  return !!session?.value
}

// Инициализация - создание папки и файла если не существуют
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.mkdir(dataDir, { recursive: true })
  } catch (e) {
    // Папка уже существует
  }

  try {
    await fs.access(PRODUCTS_FILE)
  } catch {
    // Файл не существует, создаем с пустым массивом
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify([], null, 2))
  }
}

// GET - получить все товары
export async function GET() {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
    const products = JSON.parse(data)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json([], { status: 200 })
  }
}

// POST - создать новый товар
export async function POST(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Необходима авторизация' }, { status: 401 })
  }

  try {
    await ensureDataDirectory()

    const newProduct = await request.json()
    console.log('Creating product:', newProduct)

    // Читаем текущие товары
    let products = []
    try {
      const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
      products = JSON.parse(data)
    } catch (error) {
      console.log('Products file not found, creating new array')
    }

    // Генерируем ID
    const id = Date.now().toString()
    const product = {
      ...newProduct,
      id,
      createdAt: new Date().toISOString()
    }

    products.push(product)

    // Сохраняем
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
    console.log('Product created successfully:', product.id)

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Не удалось создать товар: ${errorMessage}` },
      { status: 500 }
    )
  }
}

// PUT - обновить товар
export async function PUT(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Необходима авторизация' }, { status: 401 })
  }

  try {
    await ensureDataDirectory()

    const updatedProduct = await request.json()
    console.log('Updating product:', updatedProduct.id)

    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
    let products = JSON.parse(data)

    const index = products.findIndex((p: any) => p.id === updatedProduct.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 })
    }

    products[index] = { ...products[index], ...updatedProduct }

    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
    console.log('Product updated successfully:', updatedProduct.id)

    return NextResponse.json(products[index])
  } catch (error) {
    console.error('Error updating product:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Не удалось обновить товар: ${errorMessage}` },
      { status: 500 }
    )
  }
}

// DELETE - удалить товар
export async function DELETE(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Необходима авторизация' }, { status: 401 })
  }

  try {
    await ensureDataDirectory()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Необходимо указать ID товара' }, { status: 400 })
    }

    console.log('Deleting product:', id)

    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
    let products = JSON.parse(data)

    products = products.filter((p: any) => p.id !== id)

    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
    console.log('Product deleted successfully:', id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Не удалось удалить товар: ${errorMessage}` },
      { status: 500 }
    )
  }
}
