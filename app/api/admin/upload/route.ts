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
  console.log('Upload request received')

  if (!checkAuth()) {
    console.log('Upload failed: not authenticated')
    return NextResponse.json({ error: 'Необходима авторизация' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.log('Upload failed: no file provided')
      return NextResponse.json({ error: 'Файл не выбран' }, { status: 400 })
    }

    console.log('File received:', file.name, file.type, `${(file.size / 1024).toFixed(2)} KB`)

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      console.log('Upload failed: invalid file type:', file.type)
      return NextResponse.json({ error: 'Можно загружать только изображения' }, { status: 400 })
    }

    // Проверка размера (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      console.log('Upload failed: file too large:', file.size)
      return NextResponse.json({
        error: `Файл слишком большой! Максимум 5 МБ. Ваш файл: ${(file.size / 1024 / 1024).toFixed(2)} МБ`
      }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Генерируем уникальное имя файла
    const timestamp = Date.now()
    const ext = path.extname(file.name)
    const filename = `product-${timestamp}${ext}`

    // Создаем папку если не существует
    const productsDir = path.join(process.cwd(), 'public', 'images', 'products')
    console.log('Creating directory:', productsDir)

    try {
      await mkdir(productsDir, { recursive: true })
      console.log('Directory created/verified')
    } catch (e) {
      console.log('Directory already exists or error:', e)
    }

    // Сохраняем в public/images/products/
    const filepath = path.join(productsDir, filename)
    console.log('Writing file to:', filepath)

    await writeFile(filepath, buffer)
    console.log('File written successfully')

    // Возвращаем путь к файлу
    const imageUrl = `/images/products/${filename}`
    console.log('Upload successful, returning URL:', imageUrl)

    return NextResponse.json({ url: imageUrl })
  } catch (error) {
    console.error('Upload error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Ошибка при загрузке файла на сервер: ${errorMessage}` },
      { status: 500 }
    )
  }
}
