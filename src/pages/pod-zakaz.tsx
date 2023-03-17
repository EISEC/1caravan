import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Menu from "@/components/header/menu";
import {useEffect, useState} from "react";
import axios from "axios";
import Cards from "@/components/Cards/Cards";
import CapHome from "@/components/home/capHome";
import Footer from "@/components/footer/footer";

const inter = Inter({subsets: ['latin']})

// @ts-ignore
export default function PodZakaz({doma}) {
    const [inputSearch, setInputSearch] = useState('')
    const [inputVin, setInputVin] = useState('')
    const [filteredDoma, setFilteredDoma] = useState(doma)
    const [isFonud, setIsFound] = useState(true)
    const [mesta, setMesta] = useState([])
    const [curMesta, setCurMesta] = useState('')


    useEffect(() => {
        let filtered = doma;


        if (inputSearch) {
            // @ts-ignore
            filtered = filtered.filter((u) =>
                u.title.toLowerCase().includes(inputSearch.toLowerCase())
            )
        }

        if (inputVin) {
            // @ts-ignore
            filtered = filtered.filter((u) =>
                u.vin.toLowerCase().includes(inputVin.toLowerCase())
            )
        }

        if (curMesta) {
            // @ts-ignore
            filtered = filtered.filter((u) => u.kol_sleep === '4');
            setIsFound(filtered.length === 0 ? false : true)
        } else {
            setIsFound(filtered.length === 0 ? false : true)
            setFilteredDoma(filtered)
        }


    }, [inputSearch, inputVin, curMesta])

    useEffect(() => {
        // @ts-ignore
        const allMesta = doma.map(el => el.kol_sleep)
        const setSleep = new Set(allMesta)
        // @ts-ignore
        setMesta([...setSleep])
    }, [])

    // // @ts-ignore
    // function setCurMestaFu(e) {
    //     setCurMesta(e.target.value)
    // }

    return (
        <>
            <Head>
                <title>Заказать автодом, прицеп-дача, дом на колесах | Первый караван</title>
                <meta name="description"
                      content="Если вы еще не знаете подойдет вам дом на колесах или нет, то вы можете позвонить нам или оставить свои контактные данные, а мы в свою очередь вас проконсультируем и вы решите для себя нужно покупать дом на колесах или нет."/>
                <meta name="keywords" content="дом колесах, прицеп-дача, автодом, заказать"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu/>
            <main>
                <CapHome/>
                <section>
                    <div className="search">
                        <input value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="Поиск по названию"/>
                    </div>
                    <div className="vin">
                        <input value={inputVin} onChange={(e) => setInputVin(e.target.value)} placeholder="Поиск по VIN"/>
                    </div>
                    {/*<div className="kol_sleep">*/}
                    {/*    <p>Спальные места</p>*/}
                    {/*    {mesta.length !== 0 && mesta.map(el => {*/}
                    {/*        return (*/}
                    {/*            <>*/}
                    {/*                <input type="checkbox" id="mesta" checked={el.curMesta} onChange={(e) => setCurMesta(e.target.checked)}/>*/}
                    {/*                <label htmlFor={el}>{el}</label>*/}
                    {/*            </>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</div>*/}
                    {/*<select onChange={(e) => setCurMestaFu(e)} name="mesta" id="mesta">*/}
                    {/*    <>*/}
                    {/*        <option value=''>Выбрать</option>*/}

                    {/*        {mesta.length !== 0 && mesta.map(el => {*/}
                    {/*            return (*/}
                    {/*                <option value={el}>{el}</option>*/}
                    {/*            )*/}
                    {/*        })}*/}
                    {/*    </>*/}
                    {/*</select>*/}

                    <div>Нашлось {filteredDoma.length} караванов</div>
                </section>
                {!!filteredDoma.length && (
                    <Cards cards={filteredDoma}/>
                )}

                {isFonud && filteredDoma.length === 0 &&
                    (
                        <section>
                            <span>Подождите, загружаем ...</span>
                        </section>
                    )
                }
                {!isFonud &&
                    <section>
                        <span>Ничего не найдено </span>
                    </section>
                }
            </main>
            <Footer/>
        </>
    )
}

export async function getStaticProps() {
    const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/zakaz')
    return {
        props: {doma}, // will be passed to the page component as props
    }
}