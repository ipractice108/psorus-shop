import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, phone, email, address, quantity, totalPrice, date } = data

    // Получаем токен бота и ID чата из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured')
      return NextResponse.json(
        { error: 'Telegram configuration missing' },
        { status: 500 }
      )
    }

    // Форматируем сообщение для Telegram
    const message = `
🛒 *НОВЫЙ ЗАКАЗ*

👤 *Имя:* ${name}
📱 *Телефон:* ${phone}
${email ? `📧 *Email:* ${email}` : ''}
📍 *Адрес:* ${address}

🌿 *Товар:* Нежная кожа
📦 *Количество:* ${quantity} шт.
💰 *Сумма:* ${totalPrice.toLocaleString('ru-RU')} ₽

📅 *Дата заказа:* ${new Date(date).toLocaleString('ru-RU')}

💚 Оплата наложенным платежом
    `.trim()

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    )

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error('Telegram API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send order to Telegram' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
