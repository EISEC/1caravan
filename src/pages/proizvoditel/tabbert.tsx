import React, {useEffect, useState} from 'react';
import axios from "axios";
import Head from "next/head";
import Menu from "@/components/header/menu";
import CapHome from "@/components/home/capHome";
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/footer/footer";

const Tabbert = () => {
    const [doma, setDoma] = useState([])


    useEffect(() => {
        const getDoma = async () => {
            const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/tabbert')
            // @ts-ignore
            setDoma(doma)
            // @ts-ignore
        }
        getDoma()

    }, [])

    return (
        <>
            <Head>
                <title>Производитель автодомов Tabbert | Первый Караван</title>
                <meta name="description"
                      content="Tabbert - это немецкий производитель автодомов, который известен своей высокой качественной продукцией, продуманным дизайном и передовыми технологиями."/>
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
                    <p><b>Tabbert</b> - это <b>немецкий производитель автодомов</b>, который известен своей высокой
                        качественной
                        продукцией, продуманным дизайном и передовыми технологиями.</p>

                    <p>Компания Tabbert была основана в 1953 году и начала свою деятельность как производитель прицепов
                        для автомобилей. С течением времени компания расширила свой ассортимент и начала производство
                        автодомов.</p>

                    <p>Сегодня Tabbert является одним из ведущих производителей автодомов в Европе, предлагая широкий
                        выбор моделей для различных потребностей и бюджетов.</p>

                    <p>Одной из ключевых особенностей автодомов Tabbert является их высокое качество и продуманный
                        дизайн. Компания уделяет большое внимание каждой детали, начиная от внешнего вида и интерьера до
                        технических характеристик и функциональности.</p>

                    <p>Кроме того, автодомы Tabbert отличаются передовыми технологиями и инновационными решениями,
                        такими как системы управления энергопотреблением, мобильной связи и умный дом.</p>

                    <p>Tabbert также предлагает широкий выбор моделей автодомов, начиная от компактных и легких моделей
                        для пар и семей до более просторных и роскошных моделей для больших семей и групп.</p>

                    <p>В целом, Tabbert - это производитель автодомов, который заслуживает доверия благодаря своей
                        репутации, продуманному дизайну и передовым технологиям. Если вы ищете надежный, комфортный и
                        стильный автодом, Tabbert - это один из лучших выборов на рынке.</p>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Tabbert;