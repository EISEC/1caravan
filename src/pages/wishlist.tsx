import React from 'react';
import Menu from "@/components/header/menu";
import CapHome from "@/components/home/capHome";
import Footer from "@/components/footer/footer";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {clearWish} from "@/store/slice/wishlist";
import Image from "next/image";
import Link from "next/link";

const Wishlist = () => {
    const dispatch = useAppDispatch()
    const {wishList} = useAppSelector(state => state.wishlist)

    function getFormatPrice(price: string) {
        const pRes = Number(price)
        const formatPrice = String(pRes).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        return formatPrice
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
                                    <li className={'relative shadow-xl rounded-lg'} key={el.slug}>
                                        <Link href={{
                                            pathname: "avtodom/[...slug]",
                                            query: {slug: el.slug},
                                        }}
                                              className={'uppercase text-xl font-bold block grid grid-cols-3 rounded-lg items-center gap-2 content-between'}>
                                            <div className={'relative w-36 h-28'}>
                                                <Image className={'rounded-xl'} src={el.img} alt={el.title} fill/>
                                            </div>
                                            <h3 className={'px-4'}>{el.title}</h3>
                                            <p className={'text-right px-4 mb-0'}>{getFormatPrice(el.price)} ₽</p>
                                        </Link>
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