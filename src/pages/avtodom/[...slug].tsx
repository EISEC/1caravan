import React, {useEffect} from 'react';
import Menu from "@/components/header/menu";
import axios from "axios";
import Head from "next/head";
import cl from "./slug.module.css"
import Footer from "@/components/footer/footer";

// @ts-ignore
export default function Post({post}) {
    const proizvoditel = post._embedded['wp:term'][1][0].name
    // post._embedded['wp:term'][1][0].name
    console.log(post)

    return (
        <>
            <Head>
                <title>{post.title.rendered} | Первый караван</title>
                <meta name="description"
                      content={`Купить/Заказать ${post.title.rendered} от производителя автодомов ${proizvoditel}. Актуальная информация и приятная цена ждут Вас на нашем сайте! Подберем автодом под ваши пожелания`}/>
                <meta name="keywords"
                      content={`купить, автодом, караван, прицеп дачу, ${proizvoditel}, ${post.title.rendered}, ${post.acf.god_vipuska}`}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu/>
            <main className={cl.main}>
                <section className={cl.topheader}>
                    <div className={`auto_center ${cl.topcaravan}`}>
                        <h1>{post.title.rendered}</h1>
                        <p>Производитель караванов {proizvoditel}</p>
                    </div>
                </section>
                <section className='text' dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
            </main>
            <Footer/>
        </>
    )
}

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const allCaravans = 'https://1caravan.ru/wp-json/api/v2/doma/all'
    // if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
        paths: [],
        fallback: 'blocking',
    }
    // }

    // Call an external API endpoint to get posts
    const res = await fetch(allCaravans)
    const allDom = await res.json()

    // Get the paths we want to pre-render based on posts
    // @ts-ignore
    const paths = allDom.map((post) => ({
        params: {
            slug: [post.slug],
        },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: true}
}

// This also gets called at build time
// @ts-ignore
export async function getStaticProps({params}) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://1caravan.ru/wp-json/wp/v2/caravans?slug=${params.slug}&_embed`)
    const post = await res.json()
    // console.log(res)
    // Pass post data to the page via props
    return {props: {post: post[0]}, revalidate: 1}
}
