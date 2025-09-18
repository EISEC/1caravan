import axios from 'axios';

// Простая функция отправки в AmoCRM через внешний API
export const sendToAmoCRM = async (formData: any): Promise<boolean> => {
  try {
    const url = 'https://api.amocore.in/1caravanru/integration/one_caravan_ru/qzllbmrlz3orbmzhthdeelbml3kvut09';
    
    const data = {
      form_id: formData.formId || 1, // ID формы
      data: formData.itemMeta || [] // Данные формы
    };

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 секунд таймаут
    });

    console.log('AmoCRM request sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending to AmoCRM:', error);
    return false;
  }
};

// Форматирование данных заявки для AmoCRM
export const formatApplicationDataForAmoCRM = (applicationData: any) => {
  const isCaravanSelection = applicationData.productData?.title === 'Подбор каравана';
  
  return {
    formId: isCaravanSelection ? 2 : 1, // 2 для подбора каравана, 1 для товаров
    itemMeta: [
      {
        name: 'Имя',
        value: applicationData.name
      },
      {
        name: 'Телефон', 
        value: applicationData.phone
      },
      {
        name: 'Email',
        value: applicationData.email || ''
      },
      {
        name: 'Сообщение',
        value: applicationData.message || ''
      },
      {
        name: 'Название товара',
        value: applicationData.productData?.title || ''
      },
      {
        name: 'Цена товара',
        value: applicationData.productData?.price || ''
      },
      {
        name: 'Slug товара',
        value: applicationData.productData?.slug || ''
      },
      {
        name: 'VIN',
        value: applicationData.productData?.vin || ''
      },
      {
        name: 'Год выпуска',
        value: applicationData.productData?.year || ''
      },
      {
        name: 'Производитель',
        value: applicationData.productData?.manufacturer || ''
      },
      {
        name: 'Страна',
        value: applicationData.productData?.country || ''
      },
      {
        name: 'Масса',
        value: applicationData.productData?.mass || ''
      },
      {
        name: 'Максимальная масса',
        value: applicationData.productData?.maxMass || ''
      },
      {
        name: 'Спальные места',
        value: applicationData.productData?.sleepingPlaces || ''
      },
      {
        name: 'Габариты',
        value: applicationData.productData?.dimensions ? 
          `${applicationData.productData.dimensions.length} x ${applicationData.productData.dimensions.width} x ${applicationData.productData.dimensions.height}` : ''
      },
      {
        name: 'Статус',
        value: applicationData.productData?.status || ''
      },
      {
        name: 'Дополнительное оборудование',
        value: applicationData.selectedAddons?.map((addon: any) => addon.title).join(', ') || ''
      },
      {
        name: 'Источник',
        value: 'Сайт 1caravan.ru'
      },
      {
        name: 'Время заявки',
        value: new Date(applicationData.timestamp).toLocaleString('ru-RU')
      }
    ]
  };
};
