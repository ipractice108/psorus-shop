import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Учетные данные админа (в продакшене лучше хранить в переменных окружения)
const ADMIN_EMAIL = 'dkorolev.pm@gmail.com'
const ADMIN_PASSWORD = 'shantikungfu'

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json()

    if (action === 'logout') {
      cookies().delete('admin_session')
      return NextResponse.json({ success: true })
    }

    // Проверка credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Создаем простую сессию
      const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64')

      cookies().set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 дней
      })

      return NextResponse.json({
        success: true,
        user: { email: ADMIN_EMAIL }
      })
    }

    return NextResponse.json(
      { error: 'Неверный email или пароль' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = cookies().get('admin_session')

    if (session?.value) {
      return NextResponse.json({
        authenticated: true,
        user: { email: ADMIN_EMAIL }
      })
    }

    return NextResponse.json({ authenticated: false })
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
}
