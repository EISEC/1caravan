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
            <div
                className="relative inline-block">
                <div className="p-4 bg-white">
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
                        <Link
                            href={{
                                pathname: "/avtodom/[...slug]",
                                query: {slug: el.slug},
                            }}
                            className="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title={el.title}>
                            {el.title}
                        </Link>

                        <p className="mt-2 text-sm text-gray-800 line-clamp-1">
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
                    <table>
                        {/*Тут будут идти параметры*/}
                        <tbody className="grid grid-cols-1 grid-rows-1 gap-2 mt-2">
                        <tr className="flex gap-2 flex-col">
                            {/*Иконка*/}
                            <th className="mt-2 xl:mt-0 text-left text-gray-800">
                                Страна производитель:
                            </th>
                            {/*Параметр*/}
                            <td className="mt-2">
                                {el.acf.strana_proiz}
                            </td>
                        </tr>
                        <tr className="flex gap-2 flex-col text-gray-800">
                            <th className={'text-md text-left text-gray-800'}>Наружная часть:</th>
                            <td>Длина - <strong>{naruzha.dlina}</strong> см</td>
                            <td>Ширина - <strong>{naruzha.shirina}</strong> см</td>
                            <td>Высота - <strong>{naruzha.visota}</strong> см</td>
                            <td>Штатное место для акб
                                - <strong>{el.acf.штатное_место_для_акб ? 'Есть' : 'Нет'}</strong>
                            </td>
                            <td>Наружное подключение воды английская система
                                - <strong>{el.acf.наружное_подключение_воды_английская_система ? 'Есть' : 'Нет'}</strong>
                            </td>
                        </tr>
                        <tr className="flex gap-2 flex-col text-gray-800">
                            <th className={'text-md text-left text-gray-800'}>Жилая зона:</th>
                            <td>Спальных зон
                                - <strong>{el.acf.kol_sleep}</strong>
                            </td>
                        </tr>
                        <tr className="flex gap-2 flex-col text-gray-800">
                            <th className={'text-md text-left text-gray-800'}>Кухня:</th>

                            <td>Плита газовая - <strong>{el.acf.плита_газовая ? 'Есть' : 'Нет'}</strong></td>
                            <td>Количество конфорок - <strong>{el.acf.количество_конфорок}</strong></td>
                            <td>Плита электрическая - <strong>{el.acf.плита_электрическая ? 'Есть' : 'Нет'}</strong>
                            </td>
                            <td>Количество конфорок 2
                                - <strong>{el.acf.количество_конфорок_2 ? el.acf.количество_конфорок_2 : 'Нет'}</strong>
                            </td>
                            <td>Газовый духовой шкаф - <strong>{el.acf.газовый_духовой_шкаф ? 'Есть' : 'Нет'}</strong>
                            </td>
                            <td>Газовый гриль - <strong>{el.acf.газовый_гриль ? 'Есть' : 'Нет'}</strong></td>
                            <td>Мойка - <strong>{el.acf.мойка ? 'Есть' : 'Нет'}</strong></td>
                            <td>Холодильник: <strong
                                dangerouslySetInnerHTML={{__html: el.acf.холодильник.replace(/-|–|—/g, '<br>$&')}}/>
                            </td>
                            <td>Микроволновая печь - <strong>{el.acf.микроволновая_печь ? 'Есть' : 'Нет'}</strong>
                            </td>
                            <td>Приточно вытяжная система
                                - <strong>{el.acf.приточно_вытяжная_система ? 'Есть' : 'Нет'}</strong></td>
                        </tr>
                        <tr className="flex gap-2 flex-col text-gray-800">
                            <th className={'text-md text-left text-gray-800'}>Санузел:</th>
                            <td>Унитаз - <strong>{el.acf.унитаз ? 'Есть' : 'Нету'}</strong></td>
                            <td>Смыв туалета - <strong>{el.acf.смыв_туалета}</strong></td>
                            <td>Регулировка положения унитаза
                                - <strong>{el.acf.регулировка_положения_унитаза ? 'Есть' : 'Нет'}</strong></td>
                            <td>Душевая кабина - <strong>{el.acf.душевая_кабина}</strong></td>
                            <td>Ванная раковина - <strong>{el.acf.ванная_раковина ? 'Есть' : 'Нет'}</strong></td>
                        </tr>
                        <tr className="flex gap-2 flex-col text-gray-800">
                            <th className={'text-md text-left text-gray-800'}>Водоснабжение:</th>
                            <td>Бак для воды - <strong>{el.acf.бак_для_воды ? 'Есть' : 'Нет'}</strong></td>
                            <td>Объем бака для воды
                                - <strong>{el.acf.объем_бака_для_воды ? el.acf.объем_бака_для_воды : 'Нет'}</strong>
                            </td>
                            <td>Индикатор уровня воды в баке
                                - <strong>{el.acf.индикатор_уровня_воды_в_баке ? `Есть` : 'Нет'}</strong>
                            </td>
                            <td>Подогрев воды : <strong
                                dangerouslySetInnerHTML={{__html: el.acf.подогрев_воды.replace(/-|–|—/g, '<br>$&')}}/>
                            </td>
                            <td>Слив воды из бойлера - <strong>{el.acf.слив_воды_из_бойлера}</strong></td>
                        </tr>
                        <tr className="flex gap-2 flex-col text-gray-800">
                            <th className={'text-md text-left text-gray-800'}>Дополнительно:</th>
                            {el.acf.дополнительно ? <Dopy dopy={el.acf.дополнительно} compare={true}/> : ''}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CopmareCards;