import React from 'react';
import Link from "next/link";
import Menu from "@/components/header/menu";
import CapHome from "@/components/home/capHome";
import Footer from "@/components/footer/footer";
import {motion} from "framer-motion";
import Image from "next/image";

// @ts-ignore
export default function Blog({posts}) {

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
        <>
            <Menu/>
            <main>
                <CapHome/>
                <section>
                    <motion.ul
                        className={`list_blog`}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {/*// @ts-ignore*/}
                        {posts.slice(0, 10).map(el => {
                            return (
                                <motion.li
                                    className={`list_blog_li`}
                                    key={el.id}
                                    variants={item}
                                >
                                    <Image
                                        src={el.img}
                                        alt={el.title}
                                        width={285}
                                        height={200}
                                    />
                                    <Link href={{
                                        pathname: "/posts/[...slug]",
                                        query: {slug: el.slug},
                                    }}
                                          className={`list_blog_a`}>
                                        {el.title}
                                    </Link>
                                </motion.li>
                            )
                        })}
                    </motion.ul>
                </section>
            </main>
            <Footer/>
        </>
    )
}

// This function gets called at build time
export async function getServerSideProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://1caravan.ru/wp-json/api/v2/posts/all')
    const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}