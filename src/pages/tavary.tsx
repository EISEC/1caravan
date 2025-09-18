import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Menu from "@/components/header/menu";
import Footer from "@/components/footer/footer";
import Modal from "@/components/Modal/Modal";
import SimpleApplicationForm from "@/components/Modal/SimpleApplicationForm";
import { FaShoppingCart, FaEye, FaWater, FaBolt, FaFire, FaChair, FaUtensils, FaShower, FaLightbulb, FaLock, FaHome, FaCar, FaShoppingBag, FaTools, FaCog, FaHammer, FaPaperclip, FaCube, FaWind, FaSnowflake, FaSatellite, FaCompass, FaGamepad, FaFutbol, FaCampground, FaFish, FaCrosshairs, FaBicycle, FaMotorcycle, FaShip, FaSkiing, FaCarSide, FaBox, FaThermometerHalf, FaPlug, FaBatteryHalf, FaGasPump, FaToilet, FaBed, FaTable, FaDoorOpen, FaWindowMaximize, FaWrench, FaScrewdriver, FaMapMarkerAlt, FaTv, FaMusic, FaSwimmingPool, FaUmbrella, FaSun, FaCloudRain, FaThermometerEmpty, FaThermometerFull, FaFan, FaFilter, FaRecycle, FaTrashAlt, FaShieldAlt, FaKey, FaCamera, FaMicrophone, FaHeadphones, FaVolumeUp, FaVolumeDown, FaVolumeMute, FaPlay, FaPause, FaStop, FaForward, FaBackward, FaRandom, FaDownload, FaUpload, FaShare, FaHeart, FaStar, FaBookmark, FaFlag, FaTag, FaTags, FaCalendar, FaClock, FaStopwatch, FaHourglassHalf, FaHourglassStart, FaHourglassEnd, FaHistory, FaRedo, FaUndo, FaSave, FaEdit, FaCopy, FaCut, FaPaste, FaSearch, FaSort, FaSortUp, FaSortDown, FaSortAmountUp, FaSortAmountDown, FaSortAlphaUp, FaSortAlphaDown, FaSortNumericUp, FaSortNumericDown, FaList, FaListOl, FaListUl, FaTh, FaThList, FaThLarge, FaColumns, FaBars, FaEllipsisH, FaEllipsisV, FaPlus, FaMinus, FaTimes, FaCheck, FaCheckCircle, FaCheckSquare, FaExclamationTriangle, FaExclamationCircle, FaQuestionCircle, FaInfoCircle, FaTimesCircle, FaBan, FaUnlock, FaUnlockAlt, FaUser, FaUsers, FaUserPlus, FaUserMinus, FaUserTimes, FaUserCheck, FaUserClock, FaUserCog, FaUserEdit, FaUserFriends, FaUserGraduate, FaUserInjured, FaUserMd, FaUserNinja, FaUserSecret, FaUserShield, FaUserSlash, FaUserTag, FaUserTie, FaUserAstronaut, FaUserCircle, FaUserAlt, FaUserAltSlash } from 'react-icons/fa';
import axios from "axios";
import { GiTvRemote } from "react-icons/gi";

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    parent: number | null;
    productCount: number;
}

interface Product {
    id: number;
    slug: string;
    title: string;
    price: string;
    content: string;
    img: string;
    categories: Category[];
}

interface TavaryProps {
    tovary: Product[];
    categories: Category[];
}

export default function Tavary({ tovary, categories }: TavaryProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(tovary);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Функция для получения иконки категории
    const getCategoryIcon = (categoryName: string) => {
        const iconMap: { [key: string]: any } = {
            // Основные системы каравана
            'Водоснабжение': FaWater,
            'Газоснабжение': FaGasPump,
            'Электрика': FaPlug,
            'Электричество': FaPlug,
            'Отопление': FaThermometerHalf,
            'Вентиляция': FaFan,
            'Кондиционирование': FaSnowflake,
            
            // Сантехника и гигиена
            'Туалет': FaToilet,
            'Душ': FaShower,
            'Сантехника': FaShower,
            'Канализация': FaWater,
            
            // Кухня и питание
            'Кухня': FaUtensils,
            'Холодильник': FaCube,
            'Плита': FaFire,
            'Посуда': FaUtensils,
            
            // Мебель и интерьер
            'Мебель': FaChair,
            'Интерьер': FaHome,
            'Спальные места': FaBed,
            'Столы': FaTable,
            'Стулья': FaChair,
            
            // Освещение и электрика
            'Освещение': FaLightbulb,
            'Лампы': FaLightbulb,
            'Фонари': FaLightbulb,
            
            // Безопасность и замки
            'Безопасность': FaShieldAlt,
            'Замки': FaKey,
            'Сигнализация': FaLock,
            
            // Экстерьер и внешние элементы
            'Экстерьер': FaCar,
            'Колеса': FaCar,
            'Шины': FaCar,
            'Люки': FaWindowMaximize,
            'Окна': FaWindowMaximize,
            'Двери': FaDoorOpen,
            
            // Оборудование и инструменты
            'Оборудование': FaWrench,
            'Инструменты': FaScrewdriver,
            'Запчасти': FaCog,
            'Крепеж': FaPaperclip,
            'Болты': FaPaperclip,
            'Гайки': FaPaperclip,
            
            // Изоляция и материалы
            'Изоляция': FaCube,
            'Утеплитель': FaCube,
            'Материалы': FaCube,
            
            // Связь и навигация
            'Антенны': FaSatellite,
            'Навигация': FaCompass,
            'GPS': FaMapMarkerAlt,
            'Радио': FaSatellite,
            
            // Развлечения и спорт
            'Развлечения': FaGamepad,
            'Спорт': FaFutbol,
            'Туризм': FaCampground,
            'Кемпинг': FaCampground,
            'Рыбалка': FaFish,
            'Охота': FaCrosshairs,
            
            // Транспорт
            'Велосипеды': FaBicycle,
            'Мотоциклы': FaMotorcycle,
            'Лодки': FaShip,
            'Снегоходы': FaSkiing,
            'Квадроциклы': FaCarSide,
            
            // Специальные категории
            'Палатка': FaCampground,
            'Тент': FaUmbrella,
            'Мувер': FaBox,
            'Разное': FaBox,
        };

        // Ищем точное совпадение
        if (iconMap[categoryName]) {
            return iconMap[categoryName];
        }

        // Ищем частичное совпадение
        for (const [key, Icon] of Object.entries(iconMap)) {
            if (categoryName.toLowerCase().includes(key.toLowerCase()) || 
                key.toLowerCase().includes(categoryName.toLowerCase())) {
                return Icon;
            }
        }

        // Возвращаем дефолтную иконку
        return FaBox;
    };

    // Фильтрация товаров
    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProducts(tovary);
        } else {
            const filtered = tovary.filter(product => 
                product.categories.some(cat => cat.slug === selectedCategory)
            );
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, tovary]);

    // Обработка хеша в URL
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && categories.some(cat => cat.slug === hash)) {
                setSelectedCategory(hash);
            } else {
                setSelectedCategory('all');
            }
        };

        // Проверяем хеш при загрузке
        handleHashChange();

        // Слушаем изменения хеша
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [categories]);

    const handleApplication = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const formatPrice = (price: string) => {
        const cleanPrice = price.replace(/^от\s*/i, '');
        return cleanPrice;
    };

    const handleCategoryClick = (categorySlug: string) => {
        setSelectedCategory(categorySlug);
        // Обновляем хеш в URL
        if (categorySlug === 'all') {
            window.history.replaceState(null, '', window.location.pathname);
        } else {
            window.history.replaceState(null, '', `${window.location.pathname}#${categorySlug}`);
        }
    };

    return (
        <>
            <Head>
                <title>Товары для караванов | Первый Караван</title>
                <meta name="description" content="Широкий ассортимент товаров и аксессуаров для караванов, автодомов и кемперов. Качественные товары по доступным ценам." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Menu/>
            
            <main className="mt-28 min-h-screen bg-gray-50">
                <div className="container mx-auto py-8 px-4">
                    {/* Заголовок */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Товары для караванов</h1>
                        <p className="text-gray-600">
                            Широкий ассортимент качественных товаров и аксессуаров для вашего каравана, автодома или кемпера
                        </p>
                    </div>

                    {/* Фильтр по категориям */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Категории товаров</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                            {/* Все товары */}
                            <button
                                onClick={() => handleCategoryClick('all')}
                                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                                    selectedCategory === 'all' 
                                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <FaBox className="w-6 h-6 mb-2" />
                                <span className="text-xs font-medium text-center">Все</span>
                                <span className="text-xs text-gray-500">({tovary.length})</span>
                            </button>

                            {/* Категории */}
                            {categories.map((category) => {
                                const IconComponent = getCategoryIcon(category.name);
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.slug)}
                                        className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                                            selectedCategory === category.slug 
                                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <IconComponent className="w-6 h-6 mb-2" />
                                        <span className="text-xs font-medium text-center">{category.name}</span>
                                        <span className="text-xs text-gray-500">({category.productCount})</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Сетка товаров */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Товары не найдены</h3>
                                <p className="text-gray-600 mb-6">
                                    В выбранной категории пока нет товаров
                                </p>
                                <button 
                                    onClick={() => handleCategoryClick('all')}
                                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Показать все товары
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
                                        {/* Изображение товара */}
                                        <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] overflow-hidden block">
                                            <Image
                                                src={product.img}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                            />
                                        </Link>

                                        {/* Информация о товаре */}
                                        <div className="p-3 sm:p-4 flex flex-col flex-grow">
                                            {/* Название */}
                                            <Link href={`/products/${product.slug}`}>
                                                <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer min-h-[2.5rem]">
                                                    {product.title}
                                                </h3>
                                            </Link>

                                            {/* Описание */}
                                            {product.content && (
                                                <div className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                                                    {product.content.replace(/<[^>]*>/g, '')}
                                                </div>
                                            )}

                                            {/* Цена */}
                                            <div className="text-lg sm:text-xl font-bold text-green-600 mb-3">
                                                {formatPrice(product.price)} ₽
                                            </div>

                                            {/* Кнопки действий */}
                                            <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                                <Link 
                                                    href={`/products/${product.slug}`}
                                                    className="flex-1 bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                                                >
                                                    <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span className="hidden sm:inline">Подробнее</span>
                                                    <span className="sm:hidden">Подробно</span>
                                                </Link>
                                                <button 
                                                    onClick={() => handleApplication(product)}
                                                    className="flex-1 bg-orange-500 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                                                >
                                                    <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    Заявка
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Информация о количестве товаров */}
                    {filteredProducts.length > 0 && (
                        <div className="text-center mt-8 text-gray-600">
                            Показано {filteredProducts.length} товаров
                            {selectedCategory !== 'all' && (
                                <span> из категории &quot;{categories.find(cat => cat.slug === selectedCategory)?.name}&quot;</span>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Модальное окно заявки */}
            {selectedProduct && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <SimpleApplicationForm
                        productData={{
                            title: selectedProduct.title,
                            price: formatPrice(selectedProduct.price),
                            slug: selectedProduct.slug
                        }}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>
            )}
            
            <Footer/>
        </>
    );
};

export async function getServerSideProps() {
    try {
        const { data: products } = await axios.get('https://1caravan.ru/wp-json/api/v2/tovary');
        
        // Извлекаем уникальные категории из товаров
        const categoryMap = new Map<number, Category>();
        
        products.forEach((product: any) => {
            if (product.categories && Array.isArray(product.categories)) {
                product.categories.forEach((cat: any) => {
                    if (!categoryMap.has(cat.id)) {
                        categoryMap.set(cat.id, {
                            id: cat.id,
                            name: cat.name,
                            slug: cat.slug,
                            description: cat.description || '',
                            parent: cat.parent,
                            productCount: 1
                        });
                    } else {
                        // Увеличиваем счетчик товаров
                        const existingCategory = categoryMap.get(cat.id)!;
                        existingCategory.productCount = (existingCategory.productCount || 0) + 1;
                    }
                });
            }
        });

        const categories = Array.from(categoryMap.values()).sort((a, b) => 
            a.name.localeCompare(b.name, 'ru')
        );

        return {
            props: { 
                tovary: products,
                categories 
            },
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            props: { 
                tovary: [],
                categories: []
            },
        };
    }
}