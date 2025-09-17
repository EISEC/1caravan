import React, { useState } from 'react';
import { useApplicationSubmit } from '@/hooks/useApplicationSubmit';
import { ApplicationData } from '@/config/notifications';

interface SimpleApplicationFormProps {
  productData: {
    title: string;
    price: string;
    slug: string;
  };
  onClose: () => void;
}

const SimpleApplicationForm: React.FC<SimpleApplicationFormProps> = ({
  productData,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    emailSent: boolean;
    telegramSent: boolean;
  } | null>(null);
  
  const { submitApplication, isSubmitting, error } = useApplicationSubmit();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const applicationData: ApplicationData = {
      name: formData.name,
      phone: formData.phone,
      email: '',
      message: formData.message,
      productData: {
        title: productData.title,
        price: parseInt(productData.price.replace(/\s/g, '')) || 0,
      },
      selectedAddons: [],
      timestamp: new Date().toISOString(),
    };

    const result = await submitApplication(applicationData);
    
    if (result.success) {
      setSubmitResult({
        emailSent: result.emailSent,
        telegramSent: result.telegramSent,
      });
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 text-center">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Заявка отправлена!</h3>
        <p className="text-gray-600 mb-4">
          Спасибо за ваш интерес к {productData.title}. 
          Наш менеджер свяжется с вами в ближайшее время.
        </p>
        {submitResult && (
          <div className="text-sm text-gray-500 mb-4">
            <p>Уведомления отправлены:</p>
            <p>📧 Email: {submitResult.emailSent ? '✅' : '❌'}</p>
            <p>📱 Telegram: {submitResult.telegramSent ? '✅' : '❌'}</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Закрыть
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Оставить заявку
      </h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">{productData.title}</h3>
        <p className="text-lg font-bold text-green-600">
          {productData.price} ₽
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Имя *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Введите ваше имя"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+7 (___) ___-__-__"
          />
        </div>


        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Дополнительная информация
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ваши вопросы или пожелания..."
          />
        </div>

        {/* Скрытые поля с данными о товаре */}
        <input type="hidden" name="product_title" value={productData.title} />
        <input type="hidden" name="product_price" value={productData.price} />
        <input type="hidden" name="product_slug" value={productData.slug} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm">Ошибка отправки: {error}</p>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.phone}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleApplicationForm;
