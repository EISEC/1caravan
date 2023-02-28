import React, {useEffect, useState} from 'react';
import axios from "axios";
import Head from "next/head";
import Menu from "@/components/header/menu";
import CapHome from "@/components/home/capHome";
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/footer/footer";

const Fendt = () => {
    const [doma, setDoma] = useState([])


    useEffect(() => {
        const getDoma = async () => {
            const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/fendt')
            // @ts-ignore
            setDoma(doma)
            // @ts-ignore
        }
        getDoma()

    }, [])

    return (
        <>
            <Head>
                <title>Производитель автодомов Fendt | Первый Караван</title>
                <meta name="description"
                      content="Fendt - это немецкий производитель автодомов, который известен своей высокой качественной продукцией и инновационными технологиями."/>
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
                    <p><b>Fendt</b> - это немецкий производитель <b>автодомов</b>, который известен своей высокой
                        качественной
                        продукцией и инновационными технологиями.</p>

                    <p>Компания Fendt была основана в 1930 году и начала свою деятельность как производитель
                        сельскохозяйственной техники. В 1987 году компания приобрела бренд Caravaning и начала выпускать
                        автодома.</p>

                    <p>Сегодня Fendt является частью крупного концерна AGCO, который занимается производством
                        сельскохозяйственной техники. Благодаря этому сотрудничеству Fendt может использовать передовые
                        технологии и материалы в производстве автодомов.</p>

                    <p>Одной из главных особенностей автодомов Fendt является инновационная система управления
                        энергопотреблением Fendt Energy System (FES), которая позволяет экономить энергию и увеличивать
                        время автономной работы.</p>

                    <p>Также автодома Fendt отличаются высоким уровнем комфорта и безопасности благодаря использованию
                        современных технологий и материалов, таких как система электронного управления стабилизацией,
                        система контроля давления в шинах, а также система аварийного торможения.</p>

                    <p>Кроме того, Fendt предлагает широкий выбор моделей автодомов для различных нужд и бюджетов,
                        начиная от компактных моделей на базе автомобилей до более просторных и роскошных автодомов на
                        основе грузовых автомобилей.</p>

                    <p> В целом, автодома Fendt отличаются высоким качеством, инновационными технологиями и широким
                        выбором моделей, что делает их привлекательным выбором для тех, кто ищет надежный и комфортный
                        автодом.</p>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Fendt;