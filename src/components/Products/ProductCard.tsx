import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import Modal from '@/components/Modal/Modal';
import SimpleApplicationForm from '@/components/Modal/SimpleApplicationForm';

interface Product {
    id: string;
    title: string;
    img: string;
    price?: string;
    description?: string;
    slug?: string;
    category?: string;
    status?: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);



    const handleApplication = () => {
        setIsModalOpen(true);
    };

    const formatPrice = (price: string) => {
        const numPrice = Number(price);
        return numPrice.toLocaleString('ru-RU');
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
                {/* Изображение товара */}
                {product.slug ? (
                    <Link href={`/products/${product.slug}`} className="relative h-64 overflow-hidden block">
                        <Image
                            src={product.img}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Статус товара */}
                        {product.status && (
                            <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    product.status === 'В наличии' ? 'bg-green-500' :
                                    product.status === 'Под заказ' ? 'bg-yellow-500' :
                                    product.status === 'Распродан' ? 'bg-red-500' :
                                    'bg-gray-500'
                                } text-white`}>
                                    {product.status}
                                </span>
                            </div>
                        )}
                    </Link>
                ) : (
                    <div className="relative h-64 overflow-hidden">
                        <Image
                            src={product.img}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Статус товара */}
                        {product.status && (
                            <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    product.status === 'В наличии' ? 'bg-green-500' :
                                    product.status === 'Под заказ' ? 'bg-yellow-500' :
                                    product.status === 'Распродан' ? 'bg-red-500' :
                                    'bg-gray-500'
                                } text-white`}>
                                    {product.status}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Информация о товаре */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Категория */}
                    {product.category && (
                        <div className="text-sm text-gray-500 mb-2">
                            {product.category}
                        </div>
                    )}

                    {/* Название */}
                    {product.slug ? (
                        <Link href={`/products/${product.slug}`}>
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem] hover:text-blue-600 transition-colors cursor-pointer">
                                {product.title}
                            </h3>
                        </Link>
                    ) : (
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                            {product.title}
                        </h3>
                    )}

                    {/* Описание */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[3.75rem] flex-grow">
                        {product.description || 'Описание товара отсутствует.'}
                    </p>

                    {/* Цена */}
                    {product.price && (
                        <div className="text-xl font-bold text-green-600 mb-4">
                            {formatPrice(product.price)} ₽
                        </div>
                    )}

                    {/* Кнопка заявки */}
                    <div className="mt-auto">
                        <button
                            onClick={handleApplication}
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaShoppingCart className="w-4 h-4" />
                            Заявка
                        </button>
                    </div>
                </div>
            </div>

            {/* Модальное окно заявки */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <SimpleApplicationForm
                    productData={{
                        title: product.title,
                        price: product.price || '0',
                        slug: product.slug || product.id
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>

        </>
    );
};

export default ProductCard;
