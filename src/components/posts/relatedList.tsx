import React, {useEffect, useState} from 'react';
import cl from "./relatedList.module.css";
import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// @ts-ignore
const RelatedList = ({posts}) => {
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
            <motion.ul
                className={cl.list_related}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/*// @ts-ignore*/}
                {posts.map(el => {
                    const statusDom = el.status
                    return (
                        <motion.li
                            className={cl.card_post_related}
                            key={el.id}
                            variants={item}
                        >
                                <Link href={{
                                    pathname: "/posts/[...slug]",
                                    query: {slug: el.slug},
                                }}
                                      className={cl.ssilka}>
                                    {el.title}
                                </Link>
                        </motion.li>
                    )
                })}
            </motion.ul>
    );
};

export default RelatedList;