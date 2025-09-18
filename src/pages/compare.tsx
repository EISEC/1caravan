import Menu from "@/components/header/menu";
import {clearComp} from "@/store/slice/compare";
import Footer from "@/components/footer/footer";
import {useAppDispatch, useAppSelector} from "@/store/store";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import TabelComapareFunction from "@/components/tabelComapareFunction";
import Head from "next/head";

const Compare = () => {
    const dispatch = useAppDispatch()
    const {compareList} = useAppSelector(state => state.compare)
    const [caravans, setCaravans] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    function loadingData(i: any) {
        if (i === 0) {
            return (
                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-4">🛒</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Список сравнения пуст</h3>
                        <p className="text-gray-600 mb-6">
                            Добавьте караваны для сравнения из каталога, чтобы увидеть их характеристики рядом
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
        if (i > 0) {
            return (
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <div className="text-gray-600">Загружаем данные для сравнения...</div>
                </div>
            )
        }
    }

    function renderErrorState() {
        return (
            <div className="text-center py-16">
                <div className="max-w-lg mx-auto">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки данных</h3>
                    <p className="text-gray-600 mb-6">
                        {errorMessage || 'Не удалось загрузить данные для сравнения. Возможно, некоторые караваны были удалены или перемещены.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => {
                                setHasError(false)
                                setErrorMessage('')
                                dispatch(clearComp())
                            }}
                            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Очистить список
                        </button>
                        <button 
                            onClick={() => {
                                setHasError(false)
                                setErrorMessage('')
                                // Перезагружаем данные
                                const loadCaravans = async () => {
                                    if (compareList.length === 0) {
                                        setCaravans([]);
                                        return;
                                    }

                                    setIsLoading(true);
                                    try {
                                        const promises = compareList.map(async (item) => {
                                            const response = await axios.get(`https://1caravan.ru/wp-json/api/v2/doma/${item.slug}`);
                                            return response.data[0];
                                        });

                                        const caravansData = await Promise.all(promises);
                                        setCaravans(caravansData);
                                        setHasError(false);
                                    } catch (error) {
                                        console.error('Ошибка загрузки данных для сравнения:', error);
                                        setHasError(true);
                                        setErrorMessage('Ошибка сети или сервера. Попробуйте позже.');
                                    } finally {
                                        setIsLoading(false);
                                    }
                                };
                                loadCaravans();
                            }}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Попробовать снова
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        const loadCaravans = async () => {
            if (compareList.length === 0) {
                setCaravans([]);
                setHasError(false);
                setErrorMessage('');
                return;
            }

            setIsLoading(true);
            setHasError(false);
            setErrorMessage('');
            
            try {
                const promises = compareList.map(async (item) => {
                    const response = await axios.get(`https://1caravan.ru/wp-json/api/v2/doma/${item.slug}`);
                    return response.data[0];
                });

                const caravansData = await Promise.all(promises);
                
                // Проверяем, что все данные загрузились корректно
                const validData = caravansData.filter(item => item && item.id);
                
                if (validData.length !== compareList.length) {
                    setHasError(true);
                    setErrorMessage(`Загружено ${validData.length} из ${compareList.length} караванов. Некоторые товары могли быть удалены.`);
                    setCaravans(validData);
                } else {
                    setCaravans(caravansData);
                }
            } catch (error: any) {
                console.error('Ошибка загрузки данных для сравнения:', error);
                setHasError(true);
                
                if (error.response?.status === 404) {
                    setErrorMessage('Некоторые караваны не найдены. Возможно, они были удалены.');
                } else if (error.response?.status >= 500) {
                    setErrorMessage('Ошибка сервера. Попробуйте позже.');
                } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
                    setErrorMessage('Проблема с подключением к интернету. Проверьте соединение.');
                } else {
                    setErrorMessage('Неожиданная ошибка при загрузке данных.');
                }
                
                setCaravans([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadCaravans();
    }, [compareList])

    return (
        <>
            <Head>
                <title>Сравнение караванов | Первый Караван</title>
                <meta name="description" content="Сравните характеристики караванов и выберите подходящий вариант для вашего путешествия." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Menu/>
            <main className="mt-28 min-h-screen bg-gray-50">
                <div className="container mx-auto py-8 px-4">
                    {/* Заголовок */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Сравнение караванов</h1>
                        <p className="text-gray-600">
                            Сравните характеристики выбранных караванов и найдите идеальный вариант
                        </p>
                    </div>

                    {/* Счетчик товаров */}
                    {compareList.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">
                                    Выбранно для сравнения: <span className="font-semibold text-blue-600">{compareList.length}</span> караванов
                                </span>
                                <button 
                                    onClick={() => dispatch(clearComp())}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Очистить все
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Таблица сравнения */}
                    <div className="bg-white rounded-lg shadow-sm">
                        {hasError ? renderErrorState() :
                         isLoading ? loadingData(compareList.length) : 
                         !caravans.length ? loadingData(compareList.length) : 
                         <TabelComapareFunction arr={caravans}/>}
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Compare;