import React from 'react';
import {preObraz} from "@/components/helpFunction";
import Image from "next/image";
import Link from "next/link";
import {FaRegTrashAlt} from "react-icons/fa";
import {delet} from "@/store/slice/compare";
import {useAppDispatch} from "@/store/store";

interface CaravanData {
    id: string;
    slug: string;
    title: string;
    price: number;
    prices_sale?: number;
    img: string;
    acf: Record<string, any>;
}

interface TabelComapareFunctionProps {
    arr: CaravanData[];
}

const TabelComapareFunction = ({arr}: TabelComapareFunctionProps) => {
    const dispatch = useAppDispatch();
    const harki: string[] = [];
    
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]?.acf) {
                Object.keys(arr[i].acf).forEach((el) => {
                    harki.push(el);
                });
            }
        }
    }
    
    const unik: string[] = [...new Set(harki)];

    const proverka = (item: any): string | JSX.Element => {
        if (Array.isArray(item)) {
            const dope: string[] = [];
            item.forEach((el) => {
                if (el && typeof el === 'object' && el['наименование_характеристики']) {
                    dope.push(el['наименование_характеристики']);
                }
            });
            return dope.join(', ');
        } else if (typeof item === "boolean") {
            return item ? 'Есть' : 'Нет';
        } else if (item === undefined || item === null) {
            return '-';
        } else if (typeof item === "object" && item !== null) {
            const length = item['длинна'] || item['длина'] || '-';
            const width = item['ширина'] || '-';
            const height = item['высота'] || '-';
            return `${length} x ${width} x ${height}`;
        } else if (typeof item === "string") {
            return <p dangerouslySetInnerHTML={{__html: item}}/>;
        } else {
            return String(item);
        }
    }

    const arNenuzh = [
        'prices_sale',
        'status',
        'наличие_в_каком_городе',
        'группа_спальных_мест_в_поиске',
        'vin',
        'новый_или_бу',
        'akciya',
        'dopy',
        'osnova',
        'ospreim',
        'videob',
        'gallery_avtod',
    ]
    const newArr = unik.filter((item: string) => !arNenuzh.includes(item));

    const deletnenuzh = (item: string): string => {
        const newItem: string = preObraz(item);
        const slovo = newItem.split('_');
        if (slovo.length > 0) {
            slovo[0] = slovo[0].charAt(0).toUpperCase() + slovo[0].slice(1).toLowerCase();
        }
        return slovo.join(' ');
    }

    function getFormatPrice(price: string | number): string {
        const pRes = Number(price);
        const formatPrice = String(pRes).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        return formatPrice;
    }

    const deletCompare = (slug: string, title: string, price: number, img: string) => {
        dispatch(delet({slug, title, price, img}));
    }
    return (
        <table className={'min-w-[1280px]'}>
            <thead>
            <tr className={'text-xl text-left border-b-2 border-black'}>
                <td></td>
                {arr.map((el: any) => {
                    return (
                        <td key={el.id}>
                            <button
                                onClick={() => deletCompare(el.slug, el.title, el.price, el.img)}
                                className={'flex flex-row border-red-700 border-2 p-2 rounded items-center justify-center gap-2 disabled:bg-red-200 disabled:text-white disabled:border-red-200 disabled:cursor-no-drop transition hover:scale-90'}>
                                <FaRegTrashAlt className={'text-red-700'}/></button>
                            <Link
                                href={{
                                    pathname: "/avtodom/[...slug]",
                                    query: {slug: el.slug},
                                }}>
                                <div className="flex justify-center relative rounded-lg overflow-hidden h-64">
                                    <div
                                        className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
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
                                <h3 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1"
                                    title={el.title}>
                                    {el.title}
                                </h3>
                            </Link>
                        </td>
                    )
                })}
            </tr>
            </thead>
            <tbody>
            {newArr.map((el: string, idx: number) => {
                return (
                    <tr key={idx} className={'border-b-[1px] border-gray-950'}>
                        <td className={'w-[350px]'}>{deletnenuzh(el)}</td>
                        {arr && arr.map((item: CaravanData) => {
                            return (
                                <td key={item.id}
                                    className={'w-[350px] border-gray-950 border-l-[1px] p-2 align-baseline'}>
                                    {el === 'price' 
                                        ? (item.prices_sale 
                                            ? `${getFormatPrice(item.prices_sale)} ₽` 
                                            : `${getFormatPrice(item.price)} ₽`)
                                        : proverka(item.acf[el])
                                    }
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};

export default TabelComapareFunction;