# Как добавить изображения на сайт

## Шаг 1: Скачайте изображения с Google Drive

У вас есть 2 изображения:

1. **Фото в шапку (Header)**: https://drive.google.com/file/d/1JnE083dRZDgFiUmx1Q_M-HhANN75DKHc/view
2. **Фото в карточку продукта**: https://drive.google.com/file/d/1Pnj5rP8POOWcQVWLtkrPYMEasSUorcIY/view

### Как скачать:
1. Откройте каждую ссылку в браузере
2. Нажмите на кнопку "Скачать" (Download) в правом верхнем углу
3. Сохраните файлы на компьютер

## Шаг 2: Переименуйте файлы

После скачивания переименуйте файлы:

- Фото для шапки → `header-image.jpg` (или .png)
- Фото продукта → `product.jpg` (или .png)

## Шаг 3: Добавьте изображения в проект

### Вариант А: Локальная разработка

Скопируйте файлы в папку `public/images/`:

```bash
mkdir -p public/images
# Затем скопируйте файлы в эту папку
```

Структура должна быть такой:
```
psorus-shop/
└── public/
    └── images/
        ├── header-image.jpg
        └── product.jpg
```

### Вариант Б: Деплой на Vercel

Если вы уже задеплоили сайт на Vercel, вы можете:

1. Скачать изображения
2. Загрузить их в папку `public/images/` через git:

```bash
# Находясь в корне проекта
mkdir -p public/images
# Скопируйте ваши изображения в public/images/

git add public/images/
git commit -m "Add product and header images"
git push
```

### Вариант В: Использовать внешний хостинг

Вы можете загрузить изображения на:
- **Cloudinary** (бесплатно, удобно для e-commerce)
- **ImgBB** (бесплатно)
- **Imgur** (бесплатно)

После загрузки скопируйте прямую ссылку на изображение.

## Шаг 4: Обновите компоненты (только если используете внешний хостинг)

Если вы используете внешние ссылки, обновите файлы:

### В `components/ProductHero.tsx`:

Найдите строку:
```tsx
<div className="w-full h-full bg-gradient-to-br from-green-200 to-green-100 rounded-2xl flex items-center justify-center">
  <span className="text-8xl">🌿</span>
</div>
```

Замените на:
```tsx
<img
  src="https://ваша-ссылка-на-изображение-продукта.jpg"
  alt="Нежная кожа"
  className="w-full h-full object-cover rounded-2xl"
/>
```

## Проверка

После добавления изображений:

1. Если разработка локально: `npm run dev`
2. Откройте http://localhost:3000
3. Проверьте, что изображения отображаются

## Важно для SEO

После добавления изображений обновите:

1. Open Graph изображение в `app/layout.tsx`
2. Путь к изображению продукта в JSON-LD (строка 35)

---

**Нужна помощь?** Если возникнут проблемы, проверьте:
- Размер файлов (рекомендуется до 500KB)
- Формат (JPG, PNG, WebP)
- Путь к файлам (регистр имеет значение!)
