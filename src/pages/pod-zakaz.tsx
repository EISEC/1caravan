import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Menu from "@/components/header/menu";
import {useEffect, useState} from "react";
import axios from "axios";
import Cards from "@/components/Cards/Cards";
import CapHome from "@/components/home/capHome";
import Footer from "@/components/footer/footer";

const inter = Inter({subsets: ['latin']})

// @ts-ignore
export default function PodZakaz({doma}) {
    const [input, setInput] = useState('')

    useEffect(() => {
        doma.current.filter((u: { title: string; }) =>
        u.title.toLowerCase().includes(input.toLowerCase())
        )
    }, [input])

    return (
        <>
            <Head>
                <title>Заказать автодом, прицеп-дача, дом на колесах | Первый караван</title>
                <meta name="description" content="Если вы еще не знаете подойдет вам дом на колесах или нет, то вы можете позвонить нам или оставить свои контактные данные, а мы в свою очередь вас проконсультируем и вы решите для себя нужно покупать дом на колесах или нет."/>
                <meta name="keywords" content="дом колесах, прицеп-дача, автодом, заказать"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu/>
            <main>
                <CapHome/>
                <input value={input} onChange={(e) => setInput(e.target.value)}/>
                {doma.length ? (
                    <Cards cards={doma}/>
                ) : (
                    <section>
                        <h1>подождите, загружаем</h1>
                    </section>
                )}
            </main>
            <Footer/>
        </>
    )
}

export async function getStaticProps() {
    const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/zakaz')
    return {
        props: {doma}, // will be passed to the page component as props
    }
}