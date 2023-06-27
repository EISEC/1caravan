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
import Proiz from "@/components/Filter/proiz";

const inter = Inter({subsets: ['latin']})

// @ts-ignore
export default function PodZakaz({doma}) {
    const [inputSearch, setInputSearch] = useState('')
    const [inputVin, setInputVin] = useState('')
    const [filteredDoma, setFilteredDoma] = useState(doma)
    const [isFonud, setIsFound] = useState(true)
    const [sortPrice, setSortPrice] = useState('')
    const [sortNew, setSortNew] = useState('')
    const [sortMass, setSortMass] = useState('')
    const [sortDlinna, setSortDlinna] = useState('')

    const [mesta, setMesta] = useState([])
    const [curMesta, setCurMesta] = useState('')


    useEffect(() => {
        let filtered = [...doma]; // т.к. пропсы нельзя изменять!!! было - = doma

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


        if (sortNew) {
            filtered.sort((a, b) => {
                return sortNew === 'Новые' ?
                    (!!b.god_vipuska ? b.god_vipuska : b.price) - (a.god_vipuska ? a.god_vipuska : a.price)
                    : (!!a.god_vipuska ? a.god_vipuska : a.price) - (b.god_vipuska ? b.god_vipuska : b.price)
            })
        }

        if (sortMass) {
            filtered.sort((a, b) => {
                return sortMass === 'Тяжелые' ?
                    (!!b.mass ? b.mass : b.price) - (a.mass ? a.mass : a.price)
                    : (!!a.mass ? a.mass : a.price) - (b.mass ? b.mass : b.price)
            })
        }

        if (sortPrice) {
            filtered.sort((a, b) => {
                return sortPrice === 'Дорогие' ?
                    (!!b.prices_sale ? b.prices_sale : b.price) - (a.prices_sale ? a.prices_sale : a.price)
                    : (!!a.prices_sale ? a.prices_sale : a.price) - (b.prices_sale ? b.prices_sale : b.price)
            })
        }

        if (sortDlinna) {

        }

        if (curMesta) {

        }

        setIsFound(filtered.length === 0 ? false : true)
        setFilteredDoma(filtered)

    }, [inputSearch, inputVin, curMesta, sortMass, sortDlinna, sortPrice, sortNew])

    useEffect(() => {
        // @ts-ignore
        const allMesta = doma.map(el => el.kol_sleep)
        const setSleep = new Set(allMesta)
        // @ts-ignore
        setMesta([...setSleep])
    }, [])

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
                <Proiz/>
                <section className={'filter container px-6 py-6 mx-auto bg-blue-700 rounded-lg shadow-2xl my-[35px]'}>
                    <div className="block-filter flex w-full justify-between">
                        <div className="search">
                            <input value={inputSearch} onChange={(e) => setInputSearch(e.target.value)}
                                   placeholder="Поиск по названию"/>
                        </div>
                        <div className="vin">
                            <input value={inputVin} onChange={(e) => setInputVin(e.target.value)}
                                   placeholder="Поиск по №"/>
                        </div>
                    </div>
                    <p className={'block w-full text-white'}>Сортировать по:</p>
                    <div className="block-filter">
                        <div className="price">
                            {/*// @ts-ignore*/}
                            <select onChange={(e) => setSortPrice(e.target.value)} name="price" id="price">
                                <option value=''>По цене</option>
                                <option value='Бюджетные'>Бюджетные</option>
                                <option value='Дорогие'>Дорогие</option>
                            </select>
                        </div>
                        <div className="kachestvo">
                            {/*// @ts-ignore*/}
                            <select onChange={(e) => setSortNew(e.target.value)} name="kachestvo" id="kachestvo">
                                <option value=''>По износу</option>
                                <option value='Новые'>Новые</option>
                                <option value='бу'>Б/у</option>
                            </select>
                        </div>
                    </div>
                    <div className="block-filter">
                        <div className="massa">
                            {/*// @ts-ignore*/}
                            <select onChange={(e) => setSortMass(e.target.value)} name="massa" id="massa">
                                <option value=''>По массе</option>
                                <option value='Легкие'>Легкие</option>
                                <option value='Тяжелые'>Тяжелые</option>
                            </select>
                        </div>
                        <div className="dlinna">
                            {/*// @ts-ignore*/}
                            <select onChange={(e) => setSortDlinna(e)} name="dlinna" id="dlinna">
                                <option value=''>По длинне</option>
                                <option value='Короткие'>Короткие</option>
                                <option value='Длинные'>Длинные</option>
                            </select>
                        </div>
                    </div>
                </section>
                <div className={'container mx-auto px-6'}>Нашлось {filteredDoma.length} караванов</div>
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