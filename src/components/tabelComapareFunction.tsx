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
    
    const unik: string[] = Array.from(new Set(harki));

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
        <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: `${360 + (arr.length * 360)}px` }}>
                <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="p-4 text-left font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10 border-r-2 border-gray-200" style={{ minWidth: '360px', width: '360px' }}>
                        Характеристика
                    </th>
                    {arr.map((el: CaravanData) => {
                        return (
                            <th key={el.id} className="p-4" style={{ minWidth: '360px', width: '360px' }}>
                                {/* Кнопка удаления */}
                                <div className="flex justify-end mb-3">
                                    <button
                                        onClick={() => deletCompare(el.slug, el.title, el.price, el.img)}
                                        className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                                        title="Удалить из сравнения"
                                    >
                                        <FaRegTrashAlt className="w-3 h-3"/>
                                        Удалить
                                    </button>
                                </div>
                                
                                {/* Карточка каравана */}
                                <Link
                                    href={{
                                        pathname: "/avtodom/[...slug]",
                                        query: {slug: el.slug},
                                    }}
                                    className="block group"
                                >
                                    <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-[4/3] mb-3">
                                        <Image 
                                            src={el.img} 
                                            alt={el.title} 
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        
                                        {/* Статус каравана */}
                                        <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                                            el.acf.status === 'Выбрать' ? 'bg-green-500' : 
                                            el.acf.status === 'Забронирован' ? 'bg-yellow-500' : 
                                            el.acf.status === 'Под заказ' ? 'bg-gray-500' : 
                                            el.acf.status === 'В пути' ? 'bg-blue-500' : 
                                            'bg-red-500'
                                        } text-white`}>
                                            {el.acf.status === 'Выбрать' ? 'В наличии' : el.acf.status}
                                        </span>
                                    </div>
                                    
                                    {/* Название и цена */}
                                    <div className="text-center">
                                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {el.title}
                                        </h3>
                                        <div className="text-lg font-bold text-green-600">
                                            {el.prices_sale 
                                                ? `${getFormatPrice(el.prices_sale)} ₽` 
                                                : `${getFormatPrice(el.price)} ₽`
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {newArr.map((el: string, idx: number) => {
                    return (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0 z-10 border-r-2 border-gray-200" style={{ minWidth: '360px', width: '360px' }}>
                                {deletnenuzh(el)}
                            </td>
                            {arr && arr.map((item: CaravanData) => {
                                return (
                                    <td key={item.id} className="p-4 text-center" style={{ minWidth: '360px', width: '360px' }}>
                                        <div className="text-gray-800">
                                            {el === 'price' 
                                                ? (item.prices_sale 
                                                    ? `${getFormatPrice(item.prices_sale)} ₽` 
                                                    : `${getFormatPrice(item.price)} ₽`)
                                                : proverka(item.acf[el])
                                            }
                                        </div>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

export default TabelComapareFunction;