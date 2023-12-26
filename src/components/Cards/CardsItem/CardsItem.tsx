import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from 'next/image'
import cl from 'src/components/Cards/Cards.module.css';
import {motion} from "framer-motion";
import {FaHeart, FaRegTrashAlt} from "react-icons/fa";
import {ImShuffle} from "react-icons/im";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {AddWish, delWish} from "@/store/slice/wishlist";
import {AddComp, delet} from "@/store/slice/compare";
import Toast from "@/components/Toast/toast";
import Ststus from "@/components/Cards/CardsItem/ststus";

//@ts-ignore
const CardsItem = ({wishList, data}) => {

    // @ts-ignore
    const {compareList} = useAppSelector(state => state.compare)

    const dispatch = useAppDispatch();

    function getFormatPrice(price: string) {
        const pRes = Number(price)
        const formatPrice = String(pRes).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        return formatPrice
    }

    const [click, setClick] = useState(false)
    setTimeout(() => setClick(false), 1000)

    const [delclick, setDelclick] = useState(false)
    setTimeout(() => setDelclick(false), 1000)

    //@ts-ignore
    const sendToCart = (slug, title, price, img) => {
        //@ts-ignore
        dispatch(AddWish({slug, title, price, img}))
        //@ts-ignore
        setClick(true)
    }
    //@ts-ignore
    const sendToComp = (slug, title, price, img) => {
        //@ts-ignore
        dispatch(AddComp({slug, title, price, img}))
        //@ts-ignore
        setClick(true)
    }

    //@ts-ignore
    const deletCompare = (slug, title, price, img) => {
        //@ts-ignore
        dispatch(delet({slug, title, price, img}))
        //@ts-ignore
        setDelclick(true)
    }
    //@ts-ignore
    const deletWish = (slug, title, price, img) => {
        //@ts-ignore
        dispatch(delWish({slug, title, price, img}))
        //@ts-ignore
        setDelclick(true)
    }

    const [disableComp, setDisableComp] = useState(false)
    useEffect(() => {
        // let disableList
        //@ts-ignore
        const FindComp = compareList.findIndex(list => list.slug === data.slug)
        // @ts-ignore
        // setDisable(FindWish)
        if (FindComp === -1) {
            setDisableComp(false)
        } else {
            setDisableComp(true)
        }
    }, [compareList])

    const [disableList, setDisableList] = useState(false)
    useEffect(() => {
        //@ts-ignore
        const FindWish = wishList.findIndex(list => list.slug === data.slug)
        // @ts-ignore
        if (FindWish === -1) {
            setDisableList(false)
        } else {
            setDisableList(true)
        }
    }, [wishList])
    const statusDom = data.status

    const item = {
        hidden: {y: 50, opacity: 0},
        visible: {
            y: 0,
            opacity: 1
        }
    };
    // @ts-ignore
    return (
        <motion.li
            className={'rounded-lg overflow-hidden bg-white shadow-lg p-3 flex flex-col justify-between'}
            variants={item}
        >
            <div className={'relative h-[225px] overflow-hidden rounded-lg'}>
                <Link href={{
                    pathname: "/avtodom/[...slug]",
                    query: {slug: data.slug},
                }}>
                    <Image

                        src={data.img}
                        alt={data.title}
                        fill
                        className={'object-cover rounded-lg shadow-md transition hover:scale-125'}
                        priority/>
                    <span className={'absolute bg-white p-1 rounded mt-2 ml-2'}>№{data.vin}</span>
                </Link>
            </div>
            <div className={'mt-3 gap-3 flex flex-col justify-stretch'}>
                <Link href={{
                    pathname: "/avtodom/[...slug]",
                    query: {slug: data.slug},
                }}
                      className={'uppercase text-xl font-bold block mb-3'}>
                    {data.title}
                </Link>
                {/*// @ts-ignore*/}
                <Ststus status={statusDom}/>

                <div className={'relative'}>
                    {data.prices_sale ?
                        (
                            <p className={`${cl.salePrice} absolute -top-[12px]`}>{getFormatPrice(data.price)} ₽</p>
                        ) : null
                    }

                    <p className={`${cl.usualPrice} ${statusDom == 'Выбрать' && data.prices_sale != 0 ? cl.redprice : ''} ${statusDom == 'В пути' && data.prices_sale != 0 ? cl.redprice : ''}`}>
                        {data.prices_sale ? getFormatPrice(data.prices_sale) : getFormatPrice(data.price)} ₽
                    </p>
                </div>
                <div className={'grid grid-cols-2 gap-2 py-2'}>
                    <button
                        onClick={disableComp ? () => deletCompare(data.slug, data.title, data.price, data.img) : () => sendToComp(data.slug, data.title, data.price, data.img)}
                        className={'flex flex-row border-blue-600 border-2 py-2 rounded items-center justify-center gap-2 disabled:bg-blue-200 disabled:text-white disabled:border-blue-200 disabled:cursor-no-drop transition hover:scale-90'}>
                        {disableComp ? 'В Сравнении' : 'Сравнить'}{disableComp ?
                        <FaRegTrashAlt className={'text-red-700'}/> :
                        <ImShuffle className={'text-blue-600'}/>} </button>
                    <button
                        onClick={disableList ? () => deletWish(data.slug, data.title, data.price, data.img) : () => sendToCart(data.slug, data.title, data.price, data.img)}
                        className={'flex flex-row border-red-700 border-2 py-2 rounded items-center justify-center gap-2 disabled:bg-red-200 disabled:text-white disabled:border-red-200 disabled:cursor-no-drop transition hover:scale-90'}>
                        {disableList ? 'В Избранном' : 'Изранное'}{disableList ?
                        <FaRegTrashAlt className={'text-red-700'}/> : <FaHeart className={'text-red-700'}/>}</button>
                </div>
                <Link href={{
                    pathname: "/avtodom/[...slug]",
                    query: {slug: data.slug},
                }}
                      className={`${cl.btndark} block w-full text-center text-lg py-3 mt-2`}>
                    Подробнее
                </Link>
            </div>
            <Toast click={click} text={'Добавлено'}/>
            <Toast click={delclick} text={'Удалено'}/>
        </motion.li>
    )
};

export default CardsItem;

