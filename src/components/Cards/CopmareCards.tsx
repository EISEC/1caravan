import React from 'react';
import Image from "next/image";

//@ts-ignore
const CopmareCards = ({el}) => {
    function getFormatPrice(price: string) {
        const pRes = Number(price)
        const formatPrice = String(pRes).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        return formatPrice
    }

    return (
        <div className="relative mx-auto w-full mt-2 mb-[50px]">
            <a href="#"
               className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                <div className="shadow p-4 rounded-lg bg-white">
                    {/*Фото каравана*/}
                    <div className="flex justify-center relative rounded-lg overflow-hidden h-64">
                        <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                            <div className="absolute inset-0">
                                <Image src={el.img} alt={el.title} fill/>
                            </div>
                        </div>

                        {/*Статус каравана*/}
                        <span
                            className={`absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 ${el.acf.status === 'Выбрать' ? 'bg-green-800' : el.acf.status === 'Забронирован' ? 'bg-yellow-500' : el.acf.status === 'Под заказ' ? 'bg-gray-400' : el.acf.status === 'В пути' ? 'bg-green-800' : 'bg-red-500'} text-sm font-medium text-white select-none`}>
                        {el.acf.status === 'Выбрать' ? 'В наличии' : el.acf.status}
                      </span>
                    </div>

                    {/*Производитель и бренд*/}
                    <div className="mt-4">
                        <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title={el.title}>
                            {el.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-800 line-clamp-1"
                           title="New York, NY 10004, United States">
                            {[el.proizvoditel]}
                        </p>
                    </div>

                    {/*Цена*/}
                    <div className={`grid grid-cols-${!el.prices_sale ? '1' : '2'} mt-8`}>
                        {el.prices_sale ?
                            <div className="flex justify-start">
                                <p className="inline-block text-primary whitespace-nowrap leading-tight rounded-xl line-through">
                                    <span className="text-sm">{getFormatPrice(el.price)} </span>
                                    <span className="text-sm">
                                    ₽
                                </span>
                                </p>
                            </div> : ''
                        }
                        <div className="flex justify-end">
                            <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                                <span
                                    className={`${el.prices_sale ? 'text-red-700 underline text-xl' : 'text-lg'}`}>{el.prices_sale ? getFormatPrice(el.prices_sale) : getFormatPrice(el.price)} </span>
                                <span className="text-lg">
                                    ₽
                                </span>
                            </p>
                        </div>
                    </div>

                    {/*Тут будут идти параметры*/}
                    <div className="grid grid-cols-1 grid-rows-1 gap-2 mt-2">
                        <div className="inline-flex gap-2 flex-col xl:flex-row xl:items-center text-gray-800">
                            {/*Иконка*/}
                            <p className="mt-2 xl:mt-0">
			                    Страна производитель:
			                </p>
                            {/*Параметр*/}
                            <p className="mt-2 xl:mt-0">
                                <strong>{el.acf.strana_proiz}</strong>
			                </p>
                        </div>
                        <div className="inline-flex gap-2 flex-col xl:flex-row xl:items-center text-gray-800">
                            {/*Иконка*/}
                            <p className="mt-2 xl:mt-0">
                                Спальных мест:
                            </p>
                            {/*Параметр*/}
                            <p className="mt-2 xl:mt-0">
                                <strong>{el.acf.kol_sleep}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default CopmareCards;