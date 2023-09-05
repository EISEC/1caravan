import React, {useEffect, useState} from 'react';
import axios from "axios";
import Head from "next/head";
import Menu from "@/components/header/menu";
import CapHome from "@/components/home/capHome";
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/footer/footer";
import ParamsFilter from "@/components/Filter/paramsFilter";
import Proiz from "@/components/Filter/proiz";
import {useRouter} from "next/router";

//@ts-ignore
const Knaus = ({doma}) => {
    //@ts-ignore
    const [filteredDoma, setFilteredDoma] = useState([])
    const [isFonud, setIsFound] = useState(true)

    useEffect(() => {
        let domi = [...doma].filter((i) => {
            // @ts-ignore
            let f = i.proizvoditel
            // @ts-ignore
            if (f[0] === 'Knaus') {
                return i
            }
        })
        // @ts-ignore
        setFilteredDoma(domi)
    }, [])
    console.log(setFilteredDoma)

    useEffect(() => {
        setIsFound(filteredDoma.length === 0 ? false : true)
        for (let i = 0; i < filteredDoma.length; i++) {
        }
    }, [filteredDoma])

    return (
        <>
            <Head>
                <title>Производитель автодомов Knaus | Первый Караван</title>
                <meta name="description"
                      content="Компания Knaus была основана в 1960 году и начала свою деятельность как производитель прицепов и
                        трейлеров. С течением времени компания расширила свой ассортимент и начала производство
                        автодомов."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu/>
            <main>
                <CapHome/>
                <Proiz/>
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
                    <p><b>Knaus</b> - это немецкий производитель <b>автодомов</b>, который известен своим разнообразием
                        моделей,
                        инновационными технологиями и высоким качеством продукции.</p>

                    <p>Компания Knaus была основана в 1960 году и начала свою деятельность как производитель прицепов и
                        трейлеров. С течением времени компания расширила свой ассортимент и начала производство
                        автодомов.</p>

                    <p>Сегодня Knaus является одним из ведущих производителей автодомов в Европе, предлагая широкий
                        выбор моделей для различных потребностей и бюджетов.</p>

                    <p>Одной из ключевых особенностей автодомов Knaus является использование инновационных технологий в
                        производстве, таких как система управления энергопотреблением и экологически чистых материалов в
                        конструкции.</p>

                    <p>Кроме того, автодома Knaus отличаются высоким уровнем комфорта и безопасности благодаря
                        использованию передовых технологий и материалов, таких как система электронного управления
                        стабилизацией, система контроля давления в шинах и система аварийного торможения.</p>

                    <p>Knaus также предлагает широкий выбор моделей автодомов, начиная от компактных и легких моделей
                        для пар и семей до более просторных и роскошных моделей для больших семей и групп.</p>

                    <p>В целом, Knaus - это высококачественный производитель автодомов, который заслуживает доверия
                        благодаря своей репутации, инновационным технологиям и широкому выбору моделей. Если вы ищете
                        надежный и комфортный автодом, Knaus - это один из лучших выборов на рынке.</p>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Knaus;

export async function getStaticProps() {
    const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/vse')
    return {
        props: {doma}, // will be passed to the page component as props
    }
}