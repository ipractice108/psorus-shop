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

// GET - получить все товары
export async function GET() {
  try {
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
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const newProduct = await request.json()

    // Читаем текущие товары
    let products = []
    try {
      const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
      products = JSON.parse(data)
    } catch (error) {
      // Файл не существует, создадим новый массив
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

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// PUT - обновить товар
export async function PUT(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const updatedProduct = await request.json()

    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
    let products = JSON.parse(data)

    const index = products.findIndex((p: any) => p.id === updatedProduct.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    products[index] = { ...products[index], ...updatedProduct }

    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))

    return NextResponse.json(products[index])
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE - удалить товар
export async function DELETE(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
    let products = JSON.parse(data)

    products = products.filter((p: any) => p.id !== id)

    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
