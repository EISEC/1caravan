import Head from 'next/head'
import {Inter} from '@next/font/google'
import Menu from "@/components/header/menu";
import {useEffect, useState} from "react";
import axios from "axios";
import Cards from "@/components/Cards/Cards";
import CapHome from "@/components/home/capHome";
import Footer from "@/components/footer/footer";
import Proiz from "@/components/Filter/proiz";
import ParamsFilter from '@/components/Filter/paramsFilter';
import {useRouter} from "next/router";

const inter = Inter({subsets: ['latin']})

// @ts-ignore
export default function PodZakaz({doma, priz}) {
    const [filteredDoma, setFilteredDoma] = useState(doma)
    const [isFonud, setIsFound] = useState(true)


    useEffect(() => {
        setIsFound(filteredDoma.length === 0 ? false : true)
        for (let i = 0; i < filteredDoma.length; i++) {
        }
    }, [filteredDoma])


    return (
        <>
            <Head>
                <title>Заказать автодом, прицеп-дача, дом на колесах | Первый караван</title>
                <meta name="description"
                      content="Если вы еще не знаете подойдет вам дом на колесах или нет, то вы можете позвонить нам или оставить свои контактные данные, а мы в свою очередь вас проконсультируем и вы решите для себя нужно покупать дом на колесах или нет."/>
                <meta name="keywords" content="дом колесах, прицеп-дача, автодом, заказать"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu/>
            <main className={'mt-28'}>
                <Proiz data={priz}/>
                <ParamsFilter doma={doma} setFilteredDoma={setFilteredDoma} nameCurPage={useRouter().pathname}/>

                <div className={'container mx-auto px-6'}>Нашлось {filteredDoma.length} караванов</div>
                {!!filteredDoma.length && (
                    <Cards cards={filteredDoma}/>
                )}

                {isFonud && filteredDoma.length === 0 &&
                    (
                        <section>
                            <span>Подождите, загружаем ...</span>
                        </section>
                    )
                }
                {!isFonud &&
                    <section>
                        <span>Ничего не найдено </span>
                    </section>
                }
            </main>
            <Footer/>
        </>
    )
}

export async function getStaticProps() {
    const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/zakaz')
    const {data: priz} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/proizvoditeli')
    return {
        props: {doma, priz}, // will be passed to the page component as props
    }
}