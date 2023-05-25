import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from 'next/image'
import cl from './Cards.module.css';
import axios from "axios";
import {motion} from "framer-motion";
import {FaFilter, FaHeart} from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {AddWish} from "@/store/slice/wishlist";
import {AddComp} from "@/store/slice/compare";
import CardsItem from "@/components/Cards/CardsItem/CardsItem";

// @ts-ignore
const Cards = ({cards}) => {
    const {wishList} = useAppSelector(state => state.wishlist)
    const {compareList} = useAppSelector(state => state.compare)

    const dispatch = useAppDispatch();
    //@ts-ignore


    const [isMobile, setIsMobile] = useState(false)


    // @ts-ignore
    useEffect(() => {
        setIsMobile(window.matchMedia('(max-width: 600px)').matches)
    }, [])



    const [showCount, setShowCount] = useState(6)


    // @ts-ignore
    function getPartCards(arr) {
        const curShowCount = showCount <= arr.length ? showCount : arr.length

        return arr.slice(0, curShowCount)
    }

    function onShowMore() {
        if (isMobile) {
            setShowCount(prevState => prevState + 2)
        } else {
            setShowCount(prevState => prevState + 6)

        }
    }

    const container = {
        hidden: {opacity: 1, scale: 0},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };



    return (
        <section className={`${cl.listavto} container mx-auto`}>
            <motion.ul
                className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8'}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/*// @ts-ignore*/}
                {getPartCards(cards).map(el => <CardsItem wishList={wishList} data={el}></CardsItem>)}
            </motion.ul>
            {showCount <= cards.length ?
                (
                    <button className={`btn-green ${cl.mrgbt25} `} onClick={() => onShowMore()}>Загрузить
                        больше</button>
                ) :
                (
                    <p className={cl.mrgbt25}>Всё загружено</p>
                )

            }
        </section>
    );
};

export default Cards;