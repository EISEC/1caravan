import Head from 'next/head'
import Menu from "@/components/header/menu";
import axios from "axios";
import Cards from "@/components/Cards/Cards";
import Section1Home from "@/components/home/section1Home";
import CapHome from "@/components/home/capHome";
import SectionTextHome from "@/components/home/sectionTextHome";
import Footer from "@/components/footer/footer";
import SectionQuiz from "@/components/home/sectionQuiz";
import Otzivishki from "@/components/hero/otzivishki";
import Link from "next/link";


// @ts-ignore
export default function Home({doma}) {

    // @ts-ignore
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

                <div className="container mx-auto px-6 text-center">
                    <h2 className="ho2">Популярные караваны</h2>
                    <p className="po2">Самые просматриваемые караваны этой недели</p>
                </div>
                {doma.length ? (
                    <Cards cards={doma.slice(0, 6)}/>
                ) : (
                    <section>
                        <h1>подождите, загружаем</h1>
                    </section>
                )}
                <section className={'container mx-auto px-6 flex items-center justify-center'}>
                    <Link className={'text-lg bg-black text-white px-6 py-2 rounded-md'} href={'/catalog'}>
                        Посмотреть все предложения
                    </Link>
                </section>
                {/*<Otzivishki/>*/}
                <SectionQuiz/>
                <SectionTextHome/>
            </main>
            <Footer/>
        </>
    )
}

export async function getServerSideProps() {
    try {
        const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/index')
        return {
            props: {doma}, // will be passed to the page component as props
        }
    } catch (error) {
        console.error('Error fetching home data:', error)
        return {
            props: {doma: []}, // Return empty array on error
        }
    }
}