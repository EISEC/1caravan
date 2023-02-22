import Head from 'next/head'
import Menu from "@/components/header/menu";
import {useEffect, useState} from "react";
import axios from "axios";
import Cards from "@/components/Cards/Cards";
import Section1Home from "@/components/home/section1Home";
import Section2Home from "@/components/home/section2Home";
import CapHome from "@/components/home/capHome";


export default function Home() {
    const [doma, setDoma] = useState([])


    useEffect(() => {
        const getDoma = async () => {
            const first100 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug,title.rendered,_price,acf.price,_links.wp:featuredmedia,_embedded,acf.strana_proiz,acf.vin,acf.god_vipuska,acf.kol_sleep,acf.prices_sale,acf.status&per_page=100&_embed=wp:featuredmedia&catavtodom=7'
            const offset100 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug,title.rendered,_price,acf.price,_links.wp:featuredmedia,_embedded,acf.strana_proiz,acf.vin,acf.god_vipuska,acf.kol_sleep,acf.prices_sale,acf.status&per_page=100&_embed=wp:featuredmedia&offset=100&catavtodom=7'
            // const offset200 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug,title.rendered,_price,acf.price,_links.wp:featuredmedia,_embedded,acf.strana_proiz,acf.vin,acf.god_vipuska,acf.kol_sleep,acf.prices_sale,acf.status&per_page=100&_embed=wp:featuredmedia&offset=200&catavtodom=8'
            // const offset300 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug,title.rendered,_price,acf.price,_links.wp:featuredmedia,_embedded,acf.strana_proiz,acf.vin,acf.god_vipuska,acf.kol_sleep,acf.prices_sale,acf.status&per_page=100&_embed=wp:featuredmedia&offset=300&catavtodom=8'
            // const offset400 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug,title.rendered,_price,acf.price,_links.wp:featuredmedia,_embedded,acf.strana_proiz,acf.vin,acf.god_vipuska,acf.kol_sleep,acf.prices_sale,acf.status&per_page=100&_embed=wp:featuredmedia&offset=400&catavtodom=8'
            // const offset500 = 'https://1caravan.ru/wp-json/wp/v2/caravans?_fields=id,slug,title.rendered,_price,acf.price,_links.wp:featuredmedia,_embedded,acf.strana_proiz,acf.vin,acf.god_vipuska,acf.kol_sleep,acf.prices_sale,acf.status&per_page=100&_embed=wp:featuredmedia&offset=500&catavtodom=8'
            const res = await Promise.allSettled(
                [
                    axios.get(first100),
                    axios.get(offset100),
                    // axios.get(offset200),
                    // axios.get(offset300),
                    // axios.get(offset400),
                    // axios.get(offset500),
                ]
            )

            // @ts-ignore
            const all = []
            // @ts-ignore
            res.forEach(arr => arr.value.data.length && all.push(...arr.value.data))
            // @ts-ignore
            setDoma(all)
            // @ts-ignore


        }
        getDoma()

    }, [])


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
            </main>
        </>
    )
}
