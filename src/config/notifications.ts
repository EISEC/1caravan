// Конфигурация для уведомлений
export interface NotificationConfig {
  email: {
    enabled: boolean;
    smtp: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
    to: string; // Email получателя заявок
    from: string; // Email отправителя
  };
  telegram: {
    enabled: boolean;
    botToken: string;
    chatId: string; // ID чата для отправки сообщений
  };
}

// Получение конфигурации из переменных окружения
export const getNotificationConfig = (): NotificationConfig => {
  return {
    email: {
      enabled: process.env.EMAIL_ENABLED === 'true',
      smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      },
      to: process.env.EMAIL_TO || 'info@1caravan.ru',
      from: process.env.EMAIL_FROM || 'noreply@1caravan.ru',
    },
    telegram: {
      enabled: process.env.TELEGRAM_ENABLED === 'true',
      botToken: process.env.TELEGRAM_BOT_TOKEN || '',
      chatId: process.env.TELEGRAM_CHAT_ID || '',
    },
  };
};

// Типы для заявок
export interface ApplicationData {
  // Данные пользователя
  name: string;
  phone: string;
  email?: string;
  message?: string;
  
  // Данные о товаре
  productData: {
    title: string;
    price: number;
    vin?: string;
    year?: string;
    manufacturer?: string;
    country?: string;
    mass?: string;
    maxMass?: string;
    sleepingPlaces?: string;
    dimensions?: {
      length: string;
      width: string;
      height: string;
    };
    status?: string;
  };
  
  // Дополнительное оборудование
  selectedAddons?: Array<{
    title: string;
    price: number;
  }>;
  
  // Метаданные
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}
