# Настройка уведомлений для заявок

Система автоматически отправляет заявки на email и в Telegram. Для работы необходимо настроить переменные окружения.

## 📧 Настройка Email

### Gmail (рекомендуется)

1. **Включите двухфакторную аутентификацию** в вашем Google аккаунте
2. **Создайте пароль приложения:**
   - Перейдите в [Настройки безопасности Google](https://myaccount.google.com/security)
   - В разделе "Пароли приложений" создайте новый пароль
   - Скопируйте сгенерированный пароль

3. **Настройте переменные окружения:**
```env
EMAIL_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=info@1caravan.ru
EMAIL_FROM=noreply@1caravan.ru
```

### Другие почтовые сервисы

**Yandex:**
```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=587
SMTP_SECURE=false
```

**Mail.ru:**
```env
SMTP_HOST=smtp.mail.ru
SMTP_PORT=587
SMTP_SECURE=false
```

## 📱 Настройка Telegram

### 1. Создание бота

1. **Найдите @BotFather** в Telegram
2. **Отправьте команду** `/newbot`
3. **Следуйте инструкциям:**
   - Введите имя бота (например: "1caravan Notifications")
   - Введите username бота (например: "caravan_notifications_bot")
4. **Скопируйте токен** бота (выглядит как `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Получение Chat ID

**Для личных сообщений:**
1. Напишите боту любое сообщение
2. Откройте в браузере: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Найдите `"chat":{"id":123456789}` - это ваш Chat ID

**Для группы/канала:**
1. Добавьте бота в группу/канал
2. Дайте боту права администратора
3. Отправьте сообщение в группу
4. Используйте тот же URL для получения Chat ID группы

### 3. Настройка переменных окружения

```env
TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## 🔧 Полная конфигурация

Создайте файл `.env.local` в корне проекта:

```env
# Email настройки
EMAIL_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=info@1caravan.ru
EMAIL_FROM=noreply@1caravan.ru

# Telegram настройки
TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

## 🚀 Установка зависимостей

```bash
npm install nodemailer @types/nodemailer
# или
yarn add nodemailer @types/nodemailer
```

## ✅ Тестирование

После настройки:

1. **Запустите проект:** `npm run dev`
2. **Откройте страницу товара**
3. **Нажмите "Оставить заявку"**
4. **Заполните форму и отправьте**
5. **Проверьте email и Telegram**

## 🔍 Отладка

### Логи сервера
Проверьте консоль сервера на наличие ошибок:
```bash
npm run dev
```

### Проверка конфигурации
API endpoint `/api/application` логирует:
- Статус отправки email
- Статус отправки в Telegram
- Ошибки подключения

### Частые проблемы

**Email не отправляется:**
- Проверьте правильность пароля приложения
- Убедитесь, что двухфакторная аутентификация включена
- Проверьте настройки SMTP

**Telegram не работает:**
- Проверьте правильность токена бота
- Убедитесь, что бот добавлен в чат
- Проверьте Chat ID

## 📋 Формат уведомлений

### Email
- Красивое HTML-письмо с полной информацией о заявке
- Данные клиента, товара и выбранного оборудования
- Временная метка заявки

### Telegram
- Структурированное сообщение с эмодзи
- Вся информация о заявке в удобном формате
- Поддержка Markdown разметки

## 🔒 Безопасность

- Никогда не коммитьте файл `.env.local` в git
- Используйте пароли приложений, а не основные пароли
- Регулярно обновляйте токены ботов
- Ограничьте права ботов в Telegram
