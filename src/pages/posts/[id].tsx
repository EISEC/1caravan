import React, {useEffect} from 'react';
import Menu from "@/components/header/menu";

// @ts-ignore
export default function Post({ post }) {
    useEffect(() => {
        // console.log(post)
    }, [])
    return(
        <div>
            <Menu/>
            <h1>{post.title.rendered}</h1>
            <div className='text' dangerouslySetInnerHTML={{ __html: post.content.rendered}} />
        </div>
    )
}

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://1caravan.ru/wp-json/wp/v2/posts')
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    // @ts-ignore
    const paths = posts.map((post) => ({
        params: { id: String(post.id )},
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This also gets called at build time
// @ts-ignore
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://1caravan.ru/wp-json/wp/v2/posts/${params.id}`)
    const post = await res.json()

    // Pass post data to the page via props
    return { props: { post } }
}
