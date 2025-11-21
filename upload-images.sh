#!/bin/bash

echo "=========================================="
echo "  Загрузка изображений для Psorus.com"
echo "=========================================="
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Шаг 1: Скачайте изображения с Google Drive${NC}"
echo ""
echo "1. Фото продукта:"
echo "   https://drive.google.com/file/d/1Pnj5rP8POOWcQVWLtkrPYMEasSUorcIY/view"
echo ""
echo "2. Фото для шапки:"
echo "   https://drive.google.com/file/d/1JnE083dRZDgFiUmx1Q_M-HhANN75DKHc/view"
echo ""
echo "Откройте ссылки в браузере и нажмите 'Скачать' (Download)"
echo ""

read -p "Нажмите Enter когда скачаете файлы..."

echo ""
echo -e "${YELLOW}Шаг 2: Укажите путь к скачанным файлам${NC}"
echo ""

# Запрос пути к фото продукта
read -p "Путь к фото продукта (перетащите файл сюда): " PRODUCT_IMAGE
PRODUCT_IMAGE=$(echo $PRODUCT_IMAGE | tr -d "'\"")

if [ -f "$PRODUCT_IMAGE" ]; then
    cp "$PRODUCT_IMAGE" public/images/product.jpg
    echo -e "${GREEN}✓ Фото продукта загружено${NC}"
else
    echo "⚠ Файл не найден: $PRODUCT_IMAGE"
    echo "Пропускаем..."
fi

echo ""

# Запрос пути к фото для шапки
read -p "Путь к фото для шапки (перетащите файл сюда или Enter для пропуска): " HEADER_IMAGE
HEADER_IMAGE=$(echo $HEADER_IMAGE | tr -d "'\"")

if [ -n "$HEADER_IMAGE" ] && [ -f "$HEADER_IMAGE" ]; then
    cp "$HEADER_IMAGE" public/images/header-image.jpg
    echo -e "${GREEN}✓ Фото для шапки загружено${NC}"
else
    echo "Пропускаем фото для шапки..."
fi

echo ""
echo -e "${GREEN}=========================================="
echo "  Готово!"
echo "==========================================${NC}"
echo ""
echo "Загруженные изображения:"
ls -lh public/images/*.jpg 2>/dev/null || echo "Нет JPG файлов"
ls -lh public/images/*.png 2>/dev/null || echo "Нет PNG файлов"
echo ""
echo "Теперь запустите: npm run dev"
echo "И откройте: http://localhost:3000"
echo ""
echo "Для загрузки на GitHub:"
echo "  git add public/images/"
echo "  git commit -m 'Add product images'"
echo "  git push"
echo ""
