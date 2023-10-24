import React from 'react';
import Image from "next/image";
import Dopy from "@/components/SingleDom/dopy";
import Link from "next/link";

//@ts-ignore
const CopmareCards = ({el}) => {
    function getFormatPrice(price: string) {
        const pRes = Number(price)
        const formatPrice = String(pRes).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        return formatPrice
    }

    const naruzha = {
        dlina: el.acf.длина_каравана,
        shirina: el.acf.ширина_каравана_копия,
        visota: el.acf.высота_каравана_копия2
    }

    return (
        <div className="relative mx-auto w-full mt-2 mb-[50px]">
            <Link href={{
                pathname: "/avtodom/[...slug]",
                query: {slug: el.slug},
            }}
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
                        <div className="flex gap-2 flex-col text-gray-800">
                            <h4 className={'text-md font-bold'}>Наружная часть:</h4>
                            <ul className={'text-sm'}>
                                <li>Длина - <strong>{naruzha.dlina}</strong> см</li>
                                <li>Ширина - <strong>{naruzha.shirina}</strong> см</li>
                                <li>Высота - <strong>{naruzha.visota}</strong> см</li>
                                <li>Штатное место для акб
                                    - <strong>{el.acf.штатное_место_для_акб ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Наружное подключение воды английская система
                                    - <strong>{el.acf.наружное_подключение_воды_английская_система ? 'Есть' : 'Нет'}</strong>
                                </li>
                            </ul>
                        </div>
                        <div className="flex gap-2 flex-col text-gray-800">
                            <h4 className={'text-md font-bold'}>Жилая зона:</h4>
                            <ul className={'text-sm'}>
                                <li>Спальных зон
                                    - <strong>{el.acf.kol_sleep}</strong>
                                </li>
                            </ul>
                        </div>
                        <div className="flex gap-2 flex-col text-gray-800">
                            <h4 className={'text-md font-bold'}>Кухня:</h4>
                            <ul className={'text-sm'}>
                                <li>Плита газовая - <strong>{el.acf.плита_газовая ? 'Есть' : 'Нет'}</strong></li>
                                <li>Количество конфорок - <strong>{el.acf.количество_конфорок}</strong></li>
                                <li>Плита электрическая
                                    - <strong>{el.acf.плита_электрическая ? 'Есть' : 'Нет'}</strong></li>
                                {el.acf.количество_конфорок_2 ?
                                    <li>Количество конфорок 2 - <strong>{el.acf.количество_конфорок_2}</strong>
                                    </li> : ''}
                                <li>Газовый духовой шкаф
                                    - <strong>{el.acf.газовый_духовой_шкаф ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Газовый гриль - <strong>{el.acf.газовый_гриль ? 'Есть' : 'Нет'}</strong></li>
                                <li>Мойка - <strong>{el.acf.мойка ? 'Есть' : 'Нет'}</strong></li>
                                <li>Холодильник: <strong
                                    dangerouslySetInnerHTML={{__html: el.acf.холодильник.replace(/-|–|—/g, '<br>$&')}}/>
                                </li>
                                <li>Микроволновая печь - <strong>{el.acf.микроволновая_печь ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Приточно вытяжная система
                                    - <strong>{el.acf.приточно_вытяжная_система ? 'Есть' : 'Нет'}</strong></li>
                            </ul>
                        </div>
                        <div className="flex gap-2 flex-col text-gray-800">
                            <h4 className={'text-md font-bold'}>Санузел:</h4>
                            <ul className={'text-sm'}>
                                <li>Унитаз - <strong>{el.acf.унитаз ? 'Есть' : 'Нету'}</strong></li>
                                <li>Смыв туалета - <strong>{el.acf.смыв_туалета}</strong></li>
                                <li>Регулировка положения унитаза
                                    - <strong>{el.acf.регулировка_положения_унитаза ? 'Есть' : 'Нет'}</strong></li>
                                <li>Душевая кабина - <strong>{el.acf.душевая_кабина}</strong></li>
                                <li>Ванная раковина - <strong>{el.acf.ванная_раковина ? 'Есть' : 'Нет'}</strong></li>
                            </ul>
                        </div>
                        <div className="flex gap-2 flex-col text-gray-800">
                            <h4 className={'text-md font-bold'}>Водоснабжение:</h4>
                            <ul className={'text-sm'}>
                                <li>Бак для воды - <strong>{el.acf.бак_для_воды ? 'Есть' : 'Нет'}</strong></li>
                                {el.acf.объем_бака_для_воды ?
                                    <li>Объем бака для воды - <strong>{el.acf.объем_бака_для_воды}</strong></li> : ''}
                                {el.acf.индикатор_уровня_воды_в_баке ?
                                    <li>Индикатор уровня воды в баке
                                        - <strong>{el.acf.индикатор_уровня_воды_в_баке ? `Есть` : 'Нету'}</strong>
                                    </li> : ''}
                                <li>Подогрев воды : <strong
                                    dangerouslySetInnerHTML={{__html: el.acf.подогрев_воды.replace(/-|–|—/g, '<br>$&')}}/>
                                </li>
                                <li>Слив воды из бойлера - <strong>{el.acf.слив_воды_из_бойлера}</strong></li>
                            </ul>
                        </div>
                        <div className="flex gap-2 flex-col text-gray-800">
                            <h4 className={'text-md font-bold'}>Дополнительно:</h4>
                            <ul className={'text-sm'}>
                                {el.acf.дополнительно ? <Dopy dopy={el.acf.дополнительно} compare={true}/> : ''}
                            </ul>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CopmareCards;