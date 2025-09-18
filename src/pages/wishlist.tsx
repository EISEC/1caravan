import React, { useState, useEffect } from 'react';
import Menu from "@/components/header/menu";
import Footer from "@/components/footer/footer";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {clearWish, delWish} from "@/store/slice/wishlist";
import Image from "next/image";
import Link from "next/link";
import {FaRegTrashAlt, FaHeart, FaShoppingCart, FaEye} from "react-icons/fa";
import Ststus from "@/components/Cards/CardsItem/ststus";
import Head from "next/head";
import axios from "axios";
import Modal from "@/components/Modal/Modal";
import SimpleApplicationForm from "@/components/Modal/SimpleApplicationForm";

const Wishlist = () => {
    const dispatch = useAppDispatch()
    const {wishList} = useAppSelector(state => state.wishlist)
    const [caravans, setCaravans] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCaravan, setSelectedCaravan] = useState<any>(null)

    function getFormatPrice(price: string) {
        const pRes = Number(price)
        const formatPrice = String(pRes).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        return formatPrice
    }

    const deletWish = (slug: string, title: string, price: string, img: string, status: string) => {
        dispatch(delWish({slug, title, price, img, status}))
    }

    const handleApplication = (caravan: any, wishItem: any) => {
        setSelectedCaravan({ ...caravan, wishItem });
        setIsModalOpen(true);
    }

    // Загружаем детальные данные для избранных караванов
    useEffect(() => {
        const loadCaravans = async () => {
            if (wishList.length === 0) {
                setCaravans([]);
                return;
            }

            setIsLoading(true);
            setHasError(false);
            
            try {
                const promises = wishList.map(async (item) => {
                    const response = await axios.get(`https://1caravan.ru/wp-json/api/v2/doma/${item.slug}`);
                    return response.data[0];
                });

                const caravansData = await Promise.all(promises);
                const validData = caravansData.filter(item => item && item.id);
                setCaravans(validData);
            } catch (error) {
                console.error('Ошибка загрузки данных избранного:', error);
                setHasError(true);
                setCaravans([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadCaravans();
    }, [wishList])

    function renderEmptyState() {
        return (
            <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">💔</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Список избранного пуст</h3>
                    <p className="text-gray-600 mb-6">
                        Добавьте караваны в избранное из каталога, чтобы они появились здесь
                    </p>
                    <Link 
                        href="/catalog"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Перейти в каталог
                    </Link>
                </div>
            </div>
        )
    }

    function renderLoadingState() {
        return (
            <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <div className="text-gray-600">Загружаем избранные караваны...</div>
            </div>
        )
    }

    function renderErrorState() {
        return (
            <div className="text-center py-16">
                <div className="max-w-lg mx-auto">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки</h3>
                    <p className="text-gray-600 mb-6">
                        Не удалось загрузить данные избранного. Попробуйте обновить страницу.
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        Обновить страницу
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Избранное | Первый Караван</title>
                <meta name="description" content="Ваши избранные караваны. Сохраняйте понравившиеся модели для быстрого доступа." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Menu/>
            <main className="mt-28 min-h-screen bg-gray-50">
                <div className="container mx-auto py-8 px-4">
                    {/* Заголовок */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Избранное</h1>
                        <p className="text-gray-600">
                            Ваши сохраненные караваны для быстрого доступа
                        </p>
                    </div>

                    {/* Счетчик товаров */}
                    {wishList.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                    В избранном: <span className="font-semibold text-pink-600">{wishList.length}</span> караванов
                                </span>
                                <button 
                                    onClick={() => dispatch(clearWish())}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                                >
                                    <FaRegTrashAlt className="w-4 h-4" />
                                    Очистить все
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Сетка караванов */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {isLoading ? renderLoadingState() :
                         hasError ? renderErrorState() :
                         !wishList.length ? renderEmptyState() :
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6">
                             {caravans.map((caravan) => {
                                 const wishItem = wishList.find(item => item.slug === caravan.slug);
                                 if (!wishItem) return null;

                                 return (
                                     <div key={caravan.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
                                         {/* Изображение */}
                                         <Link href={`/avtodom/${caravan.slug}`} className="relative aspect-[4/3] overflow-hidden block">
                                             <Image
                                                 src={caravan.img}
                                                 alt={caravan.title}
                                                 fill
                                                 className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                             />
                                             
                                             {/* Статус */}
                                             <div className="absolute top-3 left-3">
                                                 <Ststus status={caravan.acf?.status || wishItem.status} />
                                             </div>

                                             {/* Кнопка удаления из избранного */}
                                             <button
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     deletWish(wishItem.slug, wishItem.title, wishItem.price, wishItem.img, wishItem.status);
                                                 }}
                                                 className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 hover:bg-white text-red-500 p-1.5 sm:p-2 rounded-full shadow-lg transition-colors"
                                                 title="Удалить из избранного"
                                             >
                                                 <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                                             </button>
                                         </Link>

                                         {/* Информация о караване */}
                                         <div className="p-3 sm:p-4 flex flex-col flex-grow">
                                             <Link href={`/avtodom/${caravan.slug}`}>
                                                 <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer min-h-[2.5rem]">
                                                     {caravan.title}
                                                 </h3>
                                             </Link>

                                             {/* Характеристики */}
                                             <div className="text-xs sm:text-sm text-gray-600 mb-3 space-y-1 flex-grow">
                                                 {caravan.acf?.год_выпуска && (
                                                     <div>Год: {caravan.acf.год_выпуска}</div>
                                                 )}
                                                 {caravan.acf?.масса && (
                                                     <div>Масса: {caravan.acf.масса} кг</div>
                                                 )}
                                                 {caravan.acf?.количество_спальных_мест && (
                                                     <div>Спальных мест: {caravan.acf.количество_спальных_мест}</div>
                                                 )}
                                             </div>

                                             {/* Цена */}
                                             <div className="text-lg sm:text-xl font-bold text-green-600 mb-3">
                                                 {getFormatPrice(wishItem.price)} ₽
                                             </div>

                                             {/* Кнопки действий */}
                                             <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                                 <Link 
                                                     href={`/avtodom/${caravan.slug}`}
                                                     className="flex-1 bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                                                 >
                                                     <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                                                     <span className="hidden sm:inline">Подробнее</span>
                                                     <span className="sm:hidden">Подробно</span>
                                                 </Link>
                                                 <button 
                                                     onClick={() => handleApplication(caravan, wishItem)}
                                                     className="flex-1 bg-orange-500 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                                                 >
                                                     <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                                                     Заявка
                                                 </button>
                                             </div>
                                         </div>
                                     </div>
                                 );
                             })}
                         </div>
                        }
                    </div>
                </div>
            </main>
            
            {/* Модальное окно заявки */}
            {selectedCaravan && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <SimpleApplicationForm
                        productData={{
                            title: selectedCaravan.title,
                            price: selectedCaravan.wishItem.price,
                            slug: selectedCaravan.slug
                        }}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>
            )}
            
            <Footer/>
        </>
    );
};

export default Wishlist;