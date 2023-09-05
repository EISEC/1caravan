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
const Weinsberg = ({doma}) => {
    //@ts-ignore
    const [filteredDoma, setFilteredDoma] = useState([])
    const [isFonud, setIsFound] = useState(true)

    useEffect(() => {
        let domi = [...doma].filter((i) => {
            // @ts-ignore
            let f = i.proizvoditel
            // @ts-ignore
            if (f[0] === 'Weinsberg') {
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
                <title>Производитель автодомов Weinsberg | Первый Караван</title>
                <meta name="description"
                      content="Компания Weinsberg была основана в 1912 году и начала свою деятельность как производитель
                        автомобильных прицепов. Сегодня Weinsberg является одним из крупнейших производителей автодомов
                        в Европе и предлагает широкий выбор моделей для различных потребностей и бюджетов."/>
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
                    <p><b>Weinsberg</b> - это немецкий производитель автодомов, который известен своими доступными
                        ценами, надежностью и инновационными решениями.</p>

                    <p>Компания Weinsberg была основана в 1912 году и начала свою деятельность как производитель
                        автомобильных прицепов. Сегодня Weinsberg является одним из крупнейших производителей автодомов
                        в Европе и предлагает широкий выбор моделей для различных потребностей и бюджетов.</p>

                    <p>Одной из ключевых особенностей <b>автодомов Weinsberg</b> является их доступность. Компания
                        стремится предложить продукцию высокого качества по разумной цене, чтобы сделать автодоминг
                        доступным для широкой аудитории.</p>

                    <p>Кроме того, автодомы Weinsberg отличаются надежностью и инновационными решениями. Компания
                        использует передовые технологии и материалы высокого качества, чтобы обеспечить надежность и
                        долговечность своих автодомов.</p>

                    <p>Weinsberg также предлагает широкий выбор моделей автодомов, начиная от компактных и экономичных
                        моделей для пар и семей до более просторных и роскошных моделей для больших семей и групп.</p>

                    <p>В целом, Weinsberg - это производитель автодомов, который заслуживает внимания благодаря своей
                        доступности, надежности и инновационным решениям. Если вы ищете надежный, экономичный и
                        функциональный автодом, Weinsberg - это один из лучших выборов на рынке.</p>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Weinsberg;

export async function getStaticProps() {
    const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/vse')
    return {
        props: {doma}, // will be passed to the page component as props
    }
}