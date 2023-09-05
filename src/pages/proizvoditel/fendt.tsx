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
const Fendt = ({doma}) => {
    //@ts-ignore
    const [filteredDoma, setFilteredDoma] = useState([])
    const [isFonud, setIsFound] = useState(true)

    useEffect(() => {
        let domi = [...doma].filter((i) => {
            // @ts-ignore
            let f = i.proizvoditel
            // @ts-ignore
            if (f[0] === 'Fendt') {
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
                <title>Производитель автодомов Fendt | Первый Караван</title>
                <meta name="description"
                      content="Компания Fendt была основана в 1930 году и начала свою деятельность как производитель
                        сельскохозяйственной техники. В 1987 году компания приобрела бренд Caravaning и начала выпускать
                        автодома."/>
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

export async function getStaticProps() {
    const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/vse')
    return {
        props: {doma}, // will be passed to the page component as props
    }
}