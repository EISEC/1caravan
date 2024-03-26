import React, {useEffect, useRef, useState} from 'react';
import cl from './Cards.module.css';
import {motion} from "framer-motion";
import {useAppSelector} from "@/store/store";

import CardsItem from "@/components/Cards/CardsItem/CardsItem";

// @ts-ignore
const Cards = ({cards}) => {
    const {wishList} = useAppSelector(state => state.wishlist)
    //@ts-ignore
    const [isMobile, setIsMobile] = useState(true)
    // @ts-ignore
    useEffect(() => {
        setIsMobile(window.matchMedia('(max-width: 600px)').matches)
    }, [])


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
        <section className={`${cl.listavto} container px-6 mx-auto`}>
            <motion.ul
                className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8'}
                variants={container}
                initial={{opacity: 1}}
                animate="visible"
            >
                {/*// @ts-ignore*/}
                {cards.map(el => <CardsItem  key={el.id} wishList={wishList} data={el}></CardsItem>)}
            </motion.ul>
        </section>
    );
};

export default Cards;