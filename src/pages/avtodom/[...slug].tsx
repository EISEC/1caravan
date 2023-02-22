import React, {useEffect} from 'react';
import Menu from "@/components/header/menu";
import axios from "axios";

// @ts-ignore
export default function Post({ post }) {
    useEffect(() => {
       // const fu = async () => {
       //     const res = await fetch(`https://1caravan.ru/wp-json/wp/v2/caravans/3734`)
       //     const post = await res.json()
       //     console.log('slug', post)
       // }
       // fu()
       //  console.log('slug', post)
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
    const first100 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug&per_page=100'
    const offset100 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug&per_page=100&offset=100'
    const offset200 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug&per_page=100&offset=200'
    const offset300 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug&per_page=100&offset=300'
    const offset400 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug&per_page=100&offset=400'
    const offset500 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug&per_page=100&offset=500'
    // const offset600 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug&per_page=100&offset=600'

    const res = await Promise.allSettled(
        [
            axios.get(first100),
            axios.get(offset100),
            axios.get(offset200),
            axios.get(offset300),
            axios.get(offset400),
            axios.get(offset500),
        ]
    )
    // @ts-ignore
    const all = []
    // @ts-ignore
    res.forEach(arr => arr.value.data.length && all.push(...arr.value.data))
    // @ts-ignore

    // Get the paths we want to pre-render based on posts
    // @ts-ignore
    const paths = all.map((post) => ({
        params: {
            slug: [post.slug],
        },
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
    const res = await fetch(`https://1caravan.ru/wp-json/wp/v2/caravans?slug=${params.slug}`)
    const post = await res.json()
    // console.log(res)
    // Pass post data to the page via props
    return { props: { post: post[0] } }
}
