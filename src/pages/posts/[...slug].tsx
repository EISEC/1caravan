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
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const allCaravans = 'https://1caravan.ru/wp-json/api/v2/posts/all'
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: 'blocking',
        }
    }

    // Call an external API endpoint to get posts

    const res = await fetch(allCaravans)
    const allPosts = await res.json()

    // Get the paths we want to pre-render based on posts
    // @ts-ignore
    const paths = allPosts.map((post) => ({
        params: {
            slug: [post.slug],
        },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: true}
}

// This also gets called at build time
// // @ts-ignore
// export async function getStaticProps({params}) {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`https://1caravan.ru/wp-json/wp/v2/posts?slug=${params.slug}&_embed`)
//     const post = await res.json()
//     // console.log(res)
//     // Pass post data to the page via props
//     return {props: {post: post[0]}, revalidate: 1}
// }


// @ts-ignore
export async function getStaticProps({params}) {
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