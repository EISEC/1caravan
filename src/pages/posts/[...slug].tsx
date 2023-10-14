import React from 'react';
import Menu from "@/components/header/menu";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import {NextSeo} from "next-seo";
import Cards from "@/components/Cards/Cards";
import axios from "axios";
import SectionQuiz from "@/components/home/sectionQuiz";


// @ts-ignore
export default function Post({post}) {

    const title = post.title.rendered
    const excerpt = post.excerpt.rendered
    const content = post.content.rendered
    const image_url = post._embedded['wp:featuredmedia'][0].source_url
    return (
        <>
            <NextSeo
                title={title.replace(/&#8212;/g, '-')}
                description={excerpt.replace(/<[^>]+>/g, '').replace(/&#8212;/g, '-').replace(/&hellip;/g, '')}
                openGraph={{
                    title: `${title.replace(/&#8212;/g, '-')}`,
                    description: `${excerpt.replace(/<[^>]+>/g, '').replace(/&#8212;/g, '-').replace(/&hellip;/g, '')}`,
                    images: [
                        {
                            url: `${image_url}`,
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
            <main className={'pb-8'}>
                <section
                    className="container px-4 mt-[150px] mx-auto mb-8 flex flex-col justify-between items-center gap-6 sm:gap-10 md:mb-16 md:gap-16 lg:flex-row">

                    <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12">
                        <p className="mb-4 font-semibold text-blue-950 md:mb-6 md:text-lg xl:text-xl">Блог</p>

                        <h1 className="text-black-800 mb-8 text-3xl font-bold sm:text-4xl md:mb-12 "
                            dangerouslySetInnerHTML={{__html: title}}></h1>
                    </div>


                    <div className="relative h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-96 xl:w-5/12">
                        <Image loading="lazy" src={image_url} alt={title} fill
                               className="h-full w-full object-cover object-center"/>
                    </div>

                </section>
                <section className="article container mx-auto">
                    <div className=" w-full px-5 py-8 mx-auto">
                        <div className="flex flex-col w-full mx-auto mb-2 prose text-left prose-md">
                            <div className='text' dangerouslySetInnerHTML={{__html: content}}/>
                        </div>
                    </div>
                </section>
                <SectionQuiz/>
            </main>
            <Footer/>
        </>
    )
}


// @ts-ignore
export async function getServerSideProps({params}) {
    const res = await fetch(`https://1caravan.ru/wp-json/wp/v2/posts?slug=${params.slug}&_embed`)
    const [post] = await res.json()
    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {post, revalidate: 1}, // will be passed to the page component as props
    }
}