import React, {useEffect} from 'react';
import Menu from "@/components/header/menu";

// @ts-ignore
export default function Post({post}) {
    return (
        <>
            <Menu/>
            <main>
                <h1>{post.title.rendered}</h1>
                <div className='text' dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
            </main>
        </>
    )
}
// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const allCaravans = 'https://1caravan.ru/wp-json/api/v2/posts/all'
    // if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
        paths: [],
        fallback: 'blocking',
    }
    // }

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
// @ts-ignore
export async function getStaticProps({params}) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://1caravan.ru/wp-json/wp/v2/posts?slug=${params.slug}&_embed`)
    const post = await res.json()
    // console.log(res)
    // Pass post data to the page via props
    return {props: {post: post[0]}, revalidate: 1}
}
