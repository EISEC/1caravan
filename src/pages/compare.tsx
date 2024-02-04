import Menu from "@/components/header/menu";
import {clearComp} from "@/store/slice/compare";
import Footer from "@/components/footer/footer";
import {useAppDispatch, useAppSelector} from "@/store/store";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CopmareCards from "@/components/Cards/CopmareCards";
import Link from "next/link";

const Compare = () => {
    const dispatch = useAppDispatch()
    const {compareList} = useAppSelector(state => state.compare)
    const [caravans, setCaravans] = useState([])

    function loadingData(i: any) {
        if (i === 0) {
            return (
                <div>
                    <h3 className={'font-bold mb-8'}>Вы ничего не добавляли сюда</h3>
                    <p>Но вы можете перейти в <Link className={'bg-green-800 text-white p-1 rounded'}
                                                    href={'/catalog'}>Каталог</Link> , что-бы добавить сюда
                        понравившиеся Вам караваны!</p>
                </div>
            )
        }
        if (i < 0) {
            return 'Ошибка формирования'
        }
        if (i > 0) {
            return 'Загружаем'
        }
    }

    useEffect(() => {
        // @ts-ignore
        compareList.forEach(async (item) => {
            // @ts-ignore
            const caravan = await axios.get(`https://1caravan.ru/wp-json/api/v2/doma/${item.slug}`)
            // @ts-ignore
            setCaravans(current => [...current, caravan.data[0]])
        })
    }, [])

    useEffect(() => {
        if (compareList.length === 0) setCaravans([])
    }, [compareList])
    console.log(caravans)
    return (
        <>
            <Menu/>
            <main className={'mt-28'}>
                <section className="container mx-auto py-5 px-2">
                    <h1 className={'font-medium text-4xl mb-8'}>Сравнение</h1>
                    <table className={'block overflow-x-auto'}>
                        <tbody>
                        <tr className={'flex gap-2'}>
                            {/*//@ts-ignore*/}
                            {!caravans.length ? loadingData(compareList.length) : caravans.map((el, idx) => {
                                return (
                                    // @ts-ignore
                                    <td className={'w-[375px]'} key={el.id}>
                                        <CopmareCards el={el}/>
                                    </td>
                                )
                            })}
                        </tr>
                        </tbody>
                    </table>
                    {/*//@ts-ignore*/}
                    {compareList.length === 0 ? '' : <button onClick={() => dispatch(clearComp())}
                                                             className="text-white bg-red-700 px-5 py-2 rounded shadow-xl my-4">
                        Очистить
                    </button>
                    }
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Compare;