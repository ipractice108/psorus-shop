import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Проверка авторизации
function checkAuth() {
  const session = cookies().get('admin_session')
  return !!session?.value
}

export async function POST(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Генерируем уникальное имя файла
    const timestamp = Date.now()
    const ext = path.extname(file.name)
    const filename = `product-${timestamp}${ext}`

    // Создаем папку если не существует
    const productsDir = path.join(process.cwd(), 'public', 'images', 'products')
    try {
      await mkdir(productsDir, { recursive: true })
    } catch (e) {
      // Папка уже существует
    }

    // Сохраняем в public/images/products/
    const filepath = path.join(productsDir, filename)
    await writeFile(filepath, buffer)

    // Возвращаем путь к файлу
    const imageUrl = `/images/products/${filename}`

    return NextResponse.json({ url: imageUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
