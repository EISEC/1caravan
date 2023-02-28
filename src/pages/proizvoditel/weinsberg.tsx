import React, {useEffect, useState} from 'react';
import axios from "axios";
import Head from "next/head";
import Menu from "@/components/header/menu";
import CapHome from "@/components/home/capHome";
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/footer/footer";

const Weinsberg = () => {
    const [doma, setDoma] = useState([])


    useEffect(() => {
        const getDoma = async () => {
            const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/weinsberg')
            // @ts-ignore
            setDoma(doma)
            // @ts-ignore
        }
        getDoma()

    }, [])

    return (
        <>
            <Head>
                <title>Производитель автодомов Weinsberg | Первый Караван</title>
                <meta name="description" content="Weinsberg - это немецкий производитель автодомов, который известен своими доступными
                        ценами, надежностью и инновационными решениями."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu/>
            <main>
                <CapHome/>
                {doma.length ? (
                    <Cards cards={doma}/>
                ) : (
                    <section>
                        <h1>подождите, загружаем</h1>
                    </section>
                )}
                <section>
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