import React from 'react';
import Link from "next/link";
import Menu from "@/components/header/menu";

// @ts-ignore
export default function Blog({posts}) {

    return (
        <>
            <Menu/>
            <main>
                <section>
                    <ul>
                        {/*// @ts-ignore*/}
                        {posts.map((post) => (
                            <li key={post.id}>
                                <Link
                                    href={{
                                        pathname: "posts/[id]",
                                        query: {id: post.id},
                                    }}
                                >
                                    {post.title.rendered}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    )
}

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://1caravan.ru/wp-json/wp/v2/posts')
    const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}