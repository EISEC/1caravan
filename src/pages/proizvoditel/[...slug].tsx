import React, {useEffect, useState} from 'react';
import axios from "axios";
import Head from "next/head";
import Menu from "@/components/header/menu";
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/footer/footer";
import ParamsFilter from "@/components/Filter/paramsFilter";
import Proiz from "@/components/Filter/proiz";
import {useRouter} from "next/router";

//@ts-ignore
export default function Slug({doma, priz}) {
    //@ts-ignore
    const [filteredDoma, setFilteredDoma] = useState([])
    const [isFonud, setIsFound] = useState(true)
    const [itit, setItit] = useState()

    useEffect(() => {
        setFilteredDoma(doma)
    }, [doma])

    useEffect(() => {
        setItit(doma[0].proizvoditel[0])
        setIsFound(filteredDoma.length === 0 ? false : true)
        for (let i = 0; i < filteredDoma.length; i++) {

        }
    }, [filteredDoma])
    return (
        <>
            <Head>
                <title>Производитель автодомов {itit} | Первый Караван</title>
                <meta name="description"
                      content="Компания Fendt была основана в 1930 году и начала свою деятельность как производитель
                        сельскохозяйственной техники. В 1987 году компания приобрела бренд Caravaning и начала выпускать
                        автодома."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu/>
            <main className={'mt-28'}>
                <Proiz data={priz}/>
                <ParamsFilter doma={filteredDoma} setFilteredDoma={setFilteredDoma} nameCurPage={useRouter().pathname}/>

                <div className={'container mx-auto px-6'}>Нашлось {filteredDoma.length} караванов</div>
                {!!filteredDoma.length && (
                    <Cards cards={filteredDoma}/>
                )}

                {isFonud && filteredDoma.length === 0 &&
                    (
                        <section className={'container mx-auto px-6'}>
                            <span>Подождите, загружаем ...</span>
                        </section>
                    )
                }
                {!isFonud &&
                    <section className={'container mx-auto px-6'}>
                        <span>Ничего не найдено </span>
                    </section>
                }
                <section className={'container mx-auto px-6'}>
                </section>
            </main>
            <Footer/>
        </>
    );
};


// @ts-ignore
export async function getServerSideProps({params}) {
    const {data: doma} = await axios.get(`https://1caravan.ru/wp-json/api/v2/doma/vse/${params.slug}`)
    const {data: priz} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/proizvoditeli')
    return {
        props: {doma, priz}, // will be passed to the page component as props
    }
}