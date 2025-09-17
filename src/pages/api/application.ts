import { NextApiRequest, NextApiResponse } from 'next';
import { getNotificationConfig, ApplicationData } from '@/config/notifications';
import nodemailer from 'nodemailer';
import axios from 'axios';

// Валидация данных заявки
const validateApplicationData = (data: any): ApplicationData | null => {
  if (!data.name || !data.phone || !data.productData) {
    return null;
  }

  return {
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || '',
    message: data.message?.trim() || '',
    productData: {
      title: data.productData.title || '',
      price: data.productData.price || 0,
      vin: data.productData.vin || '',
      year: data.productData.year || '',
      manufacturer: data.productData.manufacturer || '',
      country: data.productData.country || '',
      mass: data.productData.mass || '',
      maxMass: data.productData.maxMass || '',
      sleepingPlaces: data.productData.sleepingPlaces || '',
      dimensions: data.productData.dimensions || {},
      status: data.productData.status || '',
    },
    selectedAddons: data.selectedAddons || [],
    timestamp: new Date().toISOString(),
    userAgent: data.userAgent || '',
    referrer: data.referrer || '',
  };
};

// Форматирование цены
const formatPrice = (price: number): string => {
  return String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};

// Отправка email
const sendEmail = async (applicationData: ApplicationData): Promise<boolean> => {
  const config = getNotificationConfig();
  
  if (!config.email.enabled) {
    console.log('Email notifications disabled');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport(config.email.smtp);

    // Формирование HTML письма
    const isCaravanSelection = applicationData.productData.title === 'Подбор каравана';
    const addonsList = applicationData.selectedAddons?.length 
      ? applicationData.selectedAddons.map(addon => 
          `<li>• ${addon.title} (+${formatPrice(addon.price)} ₽)</li>`
        ).join('')
      : '<li>Дополнительное оборудование не выбрано</li>';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          ${isCaravanSelection ? 'Заявка на подбор каравана' : 'Новая заявка с сайта 1caravan.ru'}
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Данные клиента:</h3>
          <p><strong>Имя:</strong> ${applicationData.name}</p>
          <p><strong>Телефон:</strong> ${applicationData.phone}</p>
          ${applicationData.message ? `<p><strong>Сообщение:</strong> ${applicationData.message}</p>` : ''}
        </div>

        ${isCaravanSelection ? 
          `<div style="background-color: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Тип заявки:</h3>
            <p><strong>Подбор каравана</strong> - клиент просит помочь выбрать подходящий караван</p>
          </div>` :
          `<div style="background-color: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Информация о товаре:</h3>
            <p><strong>Название:</strong> ${applicationData.productData.title}</p>
            <p><strong>Цена:</strong> ${formatPrice(applicationData.productData.price)} ₽</p>
            ${applicationData.productData.vin ? `<p><strong>VIN:</strong> ${applicationData.productData.vin}</p>` : ''}
            ${applicationData.productData.year ? `<p><strong>Год выпуска:</strong> ${applicationData.productData.year}</p>` : ''}
            ${applicationData.productData.manufacturer ? `<p><strong>Производитель:</strong> ${applicationData.productData.manufacturer}</p>` : ''}
            ${applicationData.productData.country ? `<p><strong>Страна:</strong> ${applicationData.productData.country}</p>` : ''}
            ${applicationData.productData.status ? `<p><strong>Статус:</strong> ${applicationData.productData.status}</p>` : ''}
          </div>

          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">Выбранное оборудование:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${addonsList}
            </ul>
          </div>`
        }

        <div style="background-color: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 12px; color: #0c5460;">
            <strong>Время заявки:</strong> ${new Date(applicationData.timestamp).toLocaleString('ru-RU')}
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: config.email.from,
      to: config.email.to,
      subject: `Новая заявка: ${applicationData.productData.title}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Отправка в Telegram
const sendTelegram = async (applicationData: ApplicationData): Promise<boolean> => {
  const config = getNotificationConfig();
  
  if (!config.telegram.enabled) {
    console.log('Telegram notifications disabled');
    return false;
  }

  try {
    const addonsList = applicationData.selectedAddons?.length 
      ? applicationData.selectedAddons.map(addon => 
          `• ${addon.title} (+${formatPrice(addon.price)} ₽)`
        ).join('\n')
      : '• Дополнительное оборудование не выбрано';

    const isCaravanSelection = applicationData.productData.title === 'Подбор каравана';
    
    const message = `
🆕 *Новая заявка с сайта 1caravan.ru*

👤 *Клиент:*
• Имя: ${applicationData.name}
• Телефон: ${applicationData.phone}

${isCaravanSelection ? 
  `🎯 *Тип заявки:* Подбор каравана
💬 *Сообщение:* ${applicationData.message}` :
  `🚐 *Товар:*
• Название: ${applicationData.productData.title}
• Цена: ${formatPrice(applicationData.productData.price)} ₽
${applicationData.productData.vin ? `• VIN: ${applicationData.productData.vin}` : ''}
${applicationData.productData.year ? `• Год: ${applicationData.productData.year}` : ''}
${applicationData.productData.manufacturer ? `• Производитель: ${applicationData.productData.manufacturer}` : ''}
${applicationData.productData.status ? `• Статус: ${applicationData.productData.status}` : ''}`
}

🔧 *Оборудование:*
${addonsList}

${applicationData.message ? `💬 *Сообщение:*\n${applicationData.message}` : ''}

⏰ Время: ${new Date(applicationData.timestamp).toLocaleString('ru-RU')}
    `.trim();

    const response = await axios.post(
      `https://api.telegram.org/bot${config.telegram.botToken}/sendMessage`,
      {
        chat_id: config.telegram.chatId,
        text: message,
        parse_mode: 'Markdown',
      }
    );

    if (response.data.ok) {
      console.log('Telegram message sent successfully');
      return true;
    } else {
      console.error('Telegram API error:', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Валидация данных
    const applicationData = validateApplicationData(req.body);
    if (!applicationData) {
      return res.status(400).json({ error: 'Invalid application data' });
    }

    // Отправка уведомлений
    const emailSent = await sendEmail(applicationData);
    const telegramSent = await sendTelegram(applicationData);

    // Логирование результата
    console.log('Application processed:', {
      emailSent,
      telegramSent,
      timestamp: applicationData.timestamp,
    });

    return res.status(200).json({
      success: true,
      emailSent,
      telegramSent,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error processing application:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process application'
    });
  }
}
