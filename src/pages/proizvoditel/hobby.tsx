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
const Hobby = ({doma}) => {
    //@ts-ignore
    const [filteredDoma, setFilteredDoma] = useState([])
    const [isFonud, setIsFound] = useState(true)

    useEffect(() => {
        let domi = [...doma].filter((i) => {
            // @ts-ignore
            let f = i.proizvoditel
            // @ts-ignore
            if (f[0] === 'Hobby') {
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
                <title>Производитель автодомов Hobby | Первый Караван</title>
                <meta name="description"
                      content="Компания Hobby была основана в 1967 году и начала свою деятельность как производитель караванов.
                        Сегодня Hobby является одним из самых крупных производителей автодомов в Европе, предлагая
                        широкий выбор моделей для различных потребностей и бюджетов"/>
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
                    <p>Hobby - это немецкий производитель автодомов, который специализируется на производстве
                        инновационных и высококачественных автодомов для различных потребностей.</p>

                    <p>Компания Hobby была основана в 1967 году и начала свою деятельность как производитель караванов.
                        Сегодня Hobby является одним из самых крупных производителей автодомов в Европе, предлагая
                        широкий выбор моделей для различных потребностей и бюджетов.</p>

                    <p>Одной из ключевых особенностей автодомов Hobby является их инновационный подход к дизайну и
                        конструкции. Компания использует передовые технологии и материалы высокого качества, чтобы
                        создавать автодомы, которые не только функциональны, но и красивы и комфортны.</p>

                    <p>Кроме того, автодомы Hobby отличаются высоким уровнем качества и надежности. Компания тщательно
                        контролирует процесс производства, чтобы обеспечить высокое качество каждой модели. В результате
                        автодомы Hobby известны своей долговечностью и надежностью.</p>

                    <p>Hobby предлагает широкий выбор моделей автодомов, начиная от компактных моделей для пар и семей
                        до более просторных и роскошных моделей для больших семей и групп. Каждая модель имеет
                        уникальные функции и возможности, чтобы удовлетворить различные потребности
                        путешественников.</p>

                    <p>В целом, Hobby - это производитель автодомов, который заслуживает внимания благодаря своему
                        инновационному подходу к дизайну и конструкции, высокому уровню качества и надежности и широкому
                        выбору моделей для различных потребностей. Если вы ищете автодом высокого качества с
                        инновационными функциями и возможностями, автодомы Hobby могут быть отличным выбором для
                        вас.</p>

                    <p>Компания Hobby motorhome manufacturer Germany является производителем мирового класса
                        высококачественных, легких в управлении и роскошных автодомов. Компания стремится к совершенству
                        во всех видах своей деятельности, уделяя особое внимание обеспечению полного удовлетворения
                        потребностей клиентов, предоставляя им продукцию, в которой они всегда нуждаются. Если вы
                        выбираете прицеп дачу, тогда Hobby отличный вариант для вас!</p>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Hobby;

export async function getStaticProps() {
    const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/vse')
    return {
        props: {doma}, // will be passed to the page component as props
    }
}