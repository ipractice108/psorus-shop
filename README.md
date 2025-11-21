# Psorus - Интернет-магазин "Нежная кожа"

Современный минималистичный интернет-магазин для продажи натурального средства от псориаза.

## Особенности

- 🌿 Минималистичный дизайн с природными цветами
- 📱 Полностью адаптивный (мобильные устройства, планшеты, десктоп)
- 🚀 Построен на Next.js 14 с TypeScript
- 🎨 Tailwind CSS для стилизации
- 📊 Yandex Metrika для аналитики
- 🤖 Автоматическая отправка заказов в Telegram
- 🔍 SEO оптимизация для Yandex
- 💳 Оплата наложенным платежом

## Технологии

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Analytics**: Yandex Metrika
- **Notifications**: Telegram Bot API

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/ipractice108/psorus-shop.git
cd psorus-shop
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка переменных окружения

Создайте файл `.env.local` на основе `.env.example`:

```bash
cp .env.example .env.local
```

Заполните следующие переменные:

#### Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/BotFather):
   - Отправьте команду `/newbot`
   - Следуйте инструкциям
   - Скопируйте полученный токен

2. Получите ID чата:
   - Добавьте бота в группу или используйте [@userinfobot](https://t.me/userinfobot)
   - Скопируйте ID чата

```env
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_id_чата
```

#### Yandex Metrika (опционально)

1. Создайте счетчик на [metrika.yandex.ru](https://metrika.yandex.ru)
2. Скопируйте ID счетчика

```env
NEXT_PUBLIC_YANDEX_METRIKA_ID=ваш_id_метрики
```

### 4. Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### 5. Сборка для продакшена

```bash
npm run build
npm start
```

## Деплой на Vercel

### Автоматический деплой

1. Зайдите на [vercel.com](https://vercel.com)
2. Импортируйте ваш GitHub репозиторий
3. Добавьте переменные окружения в настройках проекта:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_YANDEX_METRIKA_ID`
   - `NEXT_PUBLIC_SITE_URL` (например, `https://psorus.com`)
4. Нажмите "Deploy"

### Настройка домена на GoDaddy

1. В панели Vercel перейдите в настройки домена
2. Добавьте ваш домен `psorus.com`
3. Скопируйте DNS записи, предоставленные Vercel
4. Зайдите в панель управления GoDaddy
5. Перейдите в DNS настройки
6. Добавьте следующие записи:
   - **A Record**: `@` → IP адрес от Vercel
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
7. Сохраните изменения (DNS может обновляться до 48 часов)

## Настройка SEO для Yandex

### 1. Подтверждение в Yandex Webmaster

1. Зайдите на [webmaster.yandex.ru](https://webmaster.yandex.ru)
2. Добавьте ваш сайт `psorus.com`
3. Выберите способ подтверждения "Meta-тег"
4. Скопируйте код подтверждения
5. Добавьте его в `app/layout.tsx` (уже добавлен, нужно только заменить)

### 2. Отправка sitemap

1. После подтверждения сайта в Yandex Webmaster
2. Перейдите в раздел "Индексирование" → "Файлы Sitemap"
3. Добавьте: `https://psorus.com/sitemap.xml`

### 3. Настройка robots.txt

Файл `robots.txt` уже настроен и включает:
- Разрешение индексации для всех поисковиков
- Специальные директивы для Yandex
- Ссылку на sitemap

## Структура проекта

```
psorus-shop/
├── app/
│   ├── api/
│   │   └── order/
│   │       └── route.ts          # API для обработки заказов
│   ├── globals.css               # Глобальные стили
│   ├── layout.tsx                # Корневой layout с SEO
│   ├── page.tsx                  # Главная страница
│   ├── manifest.ts               # Web App Manifest
│   └── sitemap.ts                # Динамическая sitemap
├── components/
│   ├── Header.tsx                # Шапка сайта
│   ├── ProductHero.tsx           # Блок с продуктом
│   ├── Features.tsx              # Преимущества
│   ├── HealthSection.tsx         # Блок о здоровье
│   ├── OrderForm.tsx             # Форма заказа с корзиной
│   ├── Footer.tsx                # Футер
│   └── YandexMetrika.tsx         # Yandex Metrika
├── public/
│   └── robots.txt                # Файл для поисковых систем
├── .env.example                  # Пример переменных окружения
├── next.config.js                # Конфигурация Next.js
├── tailwind.config.ts            # Конфигурация Tailwind
├── tsconfig.json                 # Конфигурация TypeScript
└── vercel.json                   # Конфигурация Vercel
```

## Как работает форма заказа

1. Пользователь выбирает количество товара (1-5 шт)
2. Заполняет форму:
   - Имя
   - Телефон
   - Email (опционально)
   - Адрес доставки
3. При отправке заказ автоматически уходит в Telegram чат
4. Пользователь видит сообщение об успешной отправке

## Формат сообщения в Telegram

```
🛒 НОВЫЙ ЗАКАЗ

👤 Имя: Иван Иванов
📱 Телефон: +7 (999) 123-45-67
📧 Email: ivan@example.com
📍 Адрес: Москва, ул. Ленина, д.1, кв.10

🌿 Товар: Нежная кожа
📦 Количество: 2 шт.
💰 Сумма: 5 980 ₽

📅 Дата заказа: 21.11.2025, 14:30

💚 Оплата наложенным платежом
```

## Расширение функционала

### Добавление новых товаров

Проект подготовлен для расширения каталога:

1. Создайте файл `data/products.ts` с массивом товаров
2. Обновите компоненты для работы с несколькими товарами
3. Добавьте маршруты для отдельных страниц товаров

### Добавление способов оплаты

Для интеграции онлайн-оплаты:

1. Выберите платежную систему (ЮKassa, Robokassa и т.д.)
2. Создайте API роут `app/api/payment/route.ts`
3. Обновите форму заказа для выбора способа оплаты

## Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте, что все переменные окружения настроены правильно
2. Убедитесь, что Telegram бот имеет доступ к чату
3. Проверьте логи в Vercel Dashboard

## Лицензия

Proprietary - Все права защищены

---

Сделано с 💚 для заботы о вашей коже
