import React from 'react';
import Link from "next/link";
import Menu from "@/components/header/menu";
import Footer from "@/components/footer/footer";
import {motion} from "framer-motion";
import Image from "next/image";
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router'

// @ts-ignore
export default function Blog({posts}) {
    const route = useRouter()
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

    const item = {
        hidden: {y: 50, opacity: 0},
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <>
            <NextSeo
                title="Блог"
                description="Полезные статьи до приобретения каравана, где отдохнуть, как выбрать."
                openGraph={{
                    title: 'Блог',
                    description: 'Полезные статьи до приобретения каравана, где отдохнуть, как выбрать.',
                    images: [
                        {
                            url: '/fonhome.jpg',
                            width: 800,
                            height: 600,
                            alt: 'Первый караван',
                            type: 'image/jpeg',
                        },
                    ],
                    siteName: 'Первый караван',
                }}
            />
            <Menu/>
            <main className={'mt-28'}>
                <section className={'container mx-auto mt-6 mb-8'}>
                    <motion.ul
                        className={`grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8`}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {/*// @ts-ignore*/}
                        {posts.slice(0, 10).map(el => {
                            return (
                                <Link key={el.id} href={{
                                    pathname: "/posts/[...slug]",
                                    query: {slug: el.slug},
                                }}
                                      className={`list_blog_a`}>
                                    <motion.li
                                        className={`group relative flex h-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 xl:h-96`}
                                        key={el.id}
                                        variants={item}
                                    >
                                        <Image
                                            loading="lazy"
                                            src={el.img}
                                            alt={el.title}
                                            fill
                                            className="inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                        />
                                        <div
                                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent md:via-transparent"></div>
                                        <div className="relative mt-auto p-4">
                                            <h2 className="mb-2 text-xl font-semibold text-white transition duration-100">{el.title}</h2>
                                            <span className="font-semibold text-indigo-300">Читать</span>
                                        </div>
                                    </motion.li>
                                </Link>
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