import React, {useEffect} from 'react';
import Menu from "@/components/header/menu";
import Footer from "@/components/footer/footer";
import Head from "next/head";
import Image from "next/image";

// @ts-ignore
export default function Post({post}) {
    const title = post.title.rendered
    const excerpt = post.excerpt.rendered
    const content = post.content.rendered
    const image_url = post._embedded['wp:featuredmedia'][0].source_url
    return (
        <>
            <Head>
                <title>{title} | Первый караван</title>
                <meta name="description"
                      content={excerpt}/>
                <meta name="keywords" content="дом колесах, прицеп-дача, автодом, купить"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu/>
            <main>
                <div className="header_blog">
                    <Image src={image_url} alt={title} layout="fill"/>
                    <div className={'auto_center'}>
                        <h1 dangerouslySetInnerHTML={{__html: title}}></h1>
                    </div>
                </div>
                <section className="article">
                    <div className='text' dangerouslySetInnerHTML={{__html: content}}/>
                </section>
            </main>
            <Footer/>
        </>
    )
}

// This function gets called at build time
// export async function getStaticPaths() {
//     const allCaravans = 'https://1caravan.ru/wp-json/api/v2/posts/all'
//     const res = await fetch(allCaravans)
//     const allPosts = await res.json()
//
//     // @ts-ignore
//     const paths = allPosts.map((post) => ({
//         params: {
//             slug: [post.slug],
//         },
//     }))
//
//     return {paths, fallback: 'blocking'}
// }


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