import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaShoppingCart, FaArrowLeft, FaShare, FaCheck } from 'react-icons/fa';
import Menu from '@/components/header/menu';
import Footer from '@/components/footer/footer';
import Modal from '@/components/Modal/Modal';
import SimpleApplicationForm from '@/components/Modal/SimpleApplicationForm';
import axios from 'axios';

interface Product {
    id: string;
    title: string;
    img: string;
    price?: string;
    description?: string;
    slug?: string;
    category?: string;
    status?: string;
    specifications?: Record<string, any>;
    gallery?: string[];
    features?: string[];
}

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const router = useRouter();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);



    const handleApplication = () => {
        setIsModalOpen(true);
    };

    const formatPrice = (price: string) => {
        const numPrice = Number(price);
        return numPrice.toLocaleString('ru-RU');
    };

    const images = product?.gallery || [product?.img || '/placeholder.jpg'];

    if (router.isFallback) {
        return <div>Загрузка...</div>;
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Товар не найден</h1>
                    <Link href="/tavary" className="text-blue-600 hover:text-blue-800">
                        Вернуться к товарам
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{product.title} | Первый Караван</title>
                <meta name="description" content={product.description || `Купить ${product.title} для каравана. Качественные товары по доступным ценам.`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Menu/>
            
            <main className="mt-28">
                <div className="container mx-auto px-4 py-8">
                    {/* Хлебные крошки */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
                        <Link href="/" className="hover:text-blue-600">Главная</Link>
                        <span>/</span>
                        <Link href="/tavary" className="hover:text-blue-600">Товары</Link>
                        <span>/</span>
                        <span className="text-gray-900">{product.title}</span>
                    </nav>

                    {/* Кнопка назад */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        Назад
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Галерея изображений */}
                        <div className="space-y-4">
                            {/* Главное изображение */}
                            <div className="relative h-96 rounded-lg overflow-hidden">
                                <Image
                                    src={images[selectedImage]}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Миниатюры */}
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                                                selectedImage === index 
                                                    ? 'border-blue-500' 
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.title} ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Информация о товаре */}
                        <div className="space-y-6">
                            {/* Заголовок и категория */}
                            <div>
                                {product.category && (
                                    <div className="text-sm text-blue-600 mb-2">
                                        {product.category}
                                    </div>
                                )}
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {product.title}
                                </h1>
                            </div>

                            {/* Цена */}
                            {product.price && (
                                <div className="text-3xl font-bold text-green-600">
                                    {formatPrice(product.price)} ₽
                                </div>
                            )}

                            {/* Статус */}
                            {product.status && (
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        product.status === 'В наличии' ? 'bg-green-100 text-green-800' :
                                        product.status === 'Под заказ' ? 'bg-yellow-100 text-yellow-800' :
                                        product.status === 'Распродан' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {product.status}
                                    </span>
                                    {product.status === 'В наличии' && (
                                        <span className="text-green-600 text-sm flex items-center gap-1">
                                            <FaCheck className="w-3 h-3" />
                                            Доступен для заказа
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Описание */}
                            {product.description && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Описание</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Характеристики */}
                            {product.specifications && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Характеристики</h3>
                                    <div className="space-y-2">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-600">{key}:</span>
                                                <span className="font-medium">{String(value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Особенности */}
                            {product.features && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Особенности</h3>
                                    <ul className="space-y-2">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <FaCheck className="w-4 h-4 text-green-500" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Кнопки действий */}
                            <div className="space-y-4">
                                <button
                                    onClick={handleApplication}
                                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
                                >
                                    <FaShoppingCart className="w-5 h-5" />
                                    Оставить заявку
                                </button>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 px-4 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
                                        <FaShare className="w-4 h-4" />
                                        Поделиться
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

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

            
            <Footer/>
        </>
    );
}

export async function getStaticPaths() {
    // Получаем список всех товаров для генерации статических путей
    try {
        const { data: products } = await axios.get('https://1caravan.ru/wp-json/api/v2/tovary');
        
        const paths = products.map((product: any) => ({
            params: { slug: [product.slug || product.id] }
        }));

        return {
            paths,
            fallback: true
        };
    } catch (error) {
        return {
            paths: [],
            fallback: true
        };
    }
}

export async function getStaticProps({ params }: { params: { slug: string[] } }) {
    try {
        const slug = params.slug[0];
        
        // Получаем данные товара
        const { data: products } = await axios.get('https://1caravan.ru/wp-json/api/v2/tovary');
        const product = products.find((p: any) => (p.slug || p.id) === slug);

        if (!product) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                product
            },
            revalidate: 3600 // Обновляем каждый час
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
}
