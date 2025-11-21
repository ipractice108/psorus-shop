import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, phone, email, address, quantity, totalPrice, date } = data

    // Валидация данных
    if (!name || !phone || !address || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Форматируем сообщение
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

    // Получаем токен бота и ID чата из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    // Если Telegram не настроен (режим разработки), логируем заказ
    if (!botToken || !chatId) {
      console.log('=' .repeat(60))
      console.log('📝 НОВЫЙ ЗАКАЗ (Telegram не настроен)')
      console.log('=' .repeat(60))
      console.log(`Имя: ${name}`)
      console.log(`Телефон: ${phone}`)
      if (email) console.log(`Email: ${email}`)
      console.log(`Адрес: ${address}`)
      console.log(`Количество: ${quantity} шт.`)
      console.log(`Сумма: ${totalPrice.toLocaleString('ru-RU')} ₽`)
      console.log(`Дата: ${new Date(date).toLocaleString('ru-RU')}`)
      console.log('=' .repeat(60))
      console.log('⚠️  Для отправки в Telegram настройте переменные:')
      console.log('   TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID')
      console.log('=' .repeat(60))

      // Возвращаем успех для режима разработки
      return NextResponse.json({
        success: true,
        devMode: true,
        message: 'Заказ принят (режим разработки)'
      })
    }

    // Отправляем сообщение в Telegram
    try {
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

        // Даже если Telegram не отправился, сохраняем заказ в логах
        console.log('=' .repeat(60))
        console.log('⚠️  ЗАКАЗ НЕ ОТПРАВЛЕН В TELEGRAM')
        console.log('=' .repeat(60))
        console.log(message)
        console.log('=' .repeat(60))

        return NextResponse.json(
          { error: 'Failed to send order to Telegram', details: errorData },
          { status: 500 }
        )
      }

      console.log('✅ Заказ успешно отправлен в Telegram')
      return NextResponse.json({ success: true })

    } catch (telegramError) {
      console.error('Telegram request error:', telegramError)

      // Логируем заказ даже при ошибке
      console.log('=' .repeat(60))
      console.log('⚠️  ОШИБКА ОТПРАВКИ В TELEGRAM')
      console.log('=' .repeat(60))
      console.log(message)
      console.log('=' .repeat(60))

      return NextResponse.json(
        { error: 'Failed to connect to Telegram' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error processing order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
