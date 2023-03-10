import Head from 'next/head'
import Menu from "@/components/header/menu";
import {useEffect, useState} from "react";
import axios from "axios";
import Cards from "@/components/Cards/Cards";
import Section1Home from "@/components/home/section1Home";
import Section2Home from "@/components/home/section2Home";
import CapHome from "@/components/home/capHome";
import SectionTextHome from "@/components/home/sectionTextHome";
import Footer from "@/components/footer/footer";
import SectionQuiz from "@/components/home/sectionQuiz";


export default function Home() {
    const [doma, setDoma] = useState([])


    useEffect(() => {
        const getDoma = async () => {
            const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/index')
            // @ts-ignore
            setDoma(doma)
            // @ts-ignore
        }
        getDoma()

    }, [])

    // @ts-ignore
    return (
        <>
            <Head>
                <title>Первый караван | Купить автодом, прицеп-дача, дом на колесах</title>
                <meta name="description"
                      content="Если вы еще не знаете подойдет вам дом на колесах или нет, то вы можете позвонить нам или оставить свои контактные данные, а мы в свою очередь вас проконсультируем и вы решите для себя нужно покупать дом на колесах или нет."/>
                <meta name="keywords" content="дом колесах, прицеп-дача, автодом, купить"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu/>
            <main>
                <CapHome/>
                <Section1Home/>
                <Section2Home/>

                <div className="auto_center">
                    <h2 className="ho2">Популярные караваны</h2>
                    <p className="po2">Самые просматриваемые караваны этой недели</p>
                </div>
                {doma.length ? (
                    <Cards cards={doma}/>
                ) : (
                    <section>
                        <h1>подождите, загружаем</h1>
                    </section>
                )}
                <SectionQuiz/>
                <SectionTextHome/>
            </main>
            <Footer/>
        </>
    )
}
