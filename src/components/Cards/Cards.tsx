import React, {useEffect, useRef, useState} from 'react';
import cl from './Cards.module.css';
import {motion} from "framer-motion";
import {useAppSelector} from "@/store/store";
import {useRouter} from 'next/router'

import CardsItem from "@/components/Cards/CardsItem/CardsItem";
import {useIsVisible} from "@/hooks/useIsVisible";

// @ts-ignore
const Cards = ({cards}) => {
    const {wishList} = useAppSelector(state => state.wishlist)
    //@ts-ignore


    const [isMobile, setIsMobile] = useState(false)

    const router = useRouter()

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

    const buttonMoreRef = useRef<HTMLButtonElement>(null)
    const isVisible = useIsVisible(buttonMoreRef)

    let homePage = '/'

    useEffect(() => {
        if (isVisible && homePage !== router.pathname) {
            onShowMore()
        }
    }, [isVisible])
    return (
        <section className={`${cl.listavto} container px-6 mx-auto`}>
            <motion.ul
                className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8'}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/*// @ts-ignore*/}
                {getPartCards(cards).map(el => <CardsItem key={el.id} wishList={wishList} data={el}></CardsItem>)}
            </motion.ul>
            {showCount <= cards.length ?
                (
                    <button ref={buttonMoreRef} className={`btn-green ${cl.mrgbt25} `}
                            onClick={() => onShowMore()}>Загрузить
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