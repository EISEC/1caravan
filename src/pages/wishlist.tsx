import React from 'react';
import Menu from "@/components/header/menu";
import Footer from "@/components/footer/footer";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {clearWish, delWish} from "@/store/slice/wishlist";
import Image from "next/image";
import Link from "next/link";
import {FaRegTrashAlt} from "react-icons/fa";
import Ststus from "@/components/Cards/CardsItem/ststus";

const Wishlist = () => {
    const dispatch = useAppDispatch()
    const {wishList} = useAppSelector(state => state.wishlist)

    function getFormatPrice(price: string) {
        const pRes = Number(price)
        const formatPrice = String(pRes).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        return formatPrice
    }

    //@ts-ignore
    const deletWish = (slug, title, price, img, status) => {
        //@ts-ignore
        dispatch(delWish({slug, title, price, img, status}))
    }

    return (
        <>
            <Menu/>
            <main className={'mt-28'}>
                <section className={'container mx-auto px-6 mt-6'}>
                    <h1 className={'font-medium text-4xl mb-8'}>Избранное</h1>
                    <ul className={'flex flex-col gap-5'}>
                        {/*//@ts-ignore*/}
                        {!wishList.length ?
                            <div>
                                <h3 className={'font-bold mb-8'}>Вы ничего не добавляли сюда</h3>
                                <p>Но вы можете перейти в <Link className={'bg-green-800 text-white p-1 rounded'}
                                                                href={'/catalog'}>Каталог</Link> , что-бы добавить сюда
                                    понравившиеся Вам караваны!</p>
                            </div>
                            : wishList.map(el => {
                                return (
                                    <li className={'relative shadow-xl rounded-lg flex flex-row items-center justify-between gap-4 pr-4'}
                                        key={el.slug}>
                                        <Link href={{
                                            pathname: "avtodom/[...slug]",
                                            query: {slug: el.slug},
                                        }}
                                              className={'uppercase text-xl font-bold rounded-lg items-center gap-2 content-between'}>
                                            <div className={'relative w-36 h-28'}>
                                                <Image className={'rounded-xl'} src={el.img} alt={el.title} fill/>
                                            </div>
                                        </Link>
                                        <h3 className={'px-4 w-full'}>{el.title}</h3>
                                        <div className={'min-w-[200px]'}>
                                            <Ststus status={el.status}/>
                                        </div>
                                        <p className={'text-right text-md px-4 mb-0 min-w-[200px]'}>{getFormatPrice(el.price)} ₽</p>
                                        <button
                                            onClick={() => deletWish(el.slug, el.title, el.price, el.img, el.status)}
                                            className={'flex flex-row border-red-700 border-2 p-2 rounded items-center justify-center gap-2 disabled:bg-red-200 disabled:text-white disabled:border-red-200 disabled:cursor-no-drop transition hover:scale-90'}>
                                            <FaRegTrashAlt className={'text-red-700'}/></button>
                                    </li>
                                )

                            })}
                    </ul>
                    {/*//@ts-ignore*/}
                    {wishList.length === 0 ? '' : <button onClick={() => dispatch(clearWish())}
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

export default Wishlist;