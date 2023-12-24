import Menu from "@/components/header/menu";
import axios from 'axios'
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/footer/footer";
import HeadTitle from "@/components/header/HeadTitle";
import {useEffect, useState} from "react";
import ParamsFilter from "@/components/Filter/paramsFilter";
import Akciya from "@/components/hero/Akciya";
import {useRouter} from "next/router";

// @ts-ignore
export default function Avtodom({doma, dom}) {
    const [filteredDoma, setFilteredDoma] = useState(doma)
    const [isFonud, setIsFound] = useState(true)

    useEffect(() => {
        // @ts-ignore
        const allMesta = doma.map(el => el.kol_sleep)
        const setSleep = new Set(allMesta)
    }, [doma])

    useEffect(() => {
        setIsFound(filteredDoma.length === 0 ? false : true)
        for (let i = 0; i < filteredDoma.length; i++) {
        }
    }, [filteredDoma])

    return (
        <>
            <HeadTitle/>
            <Menu/>
            <main className={'mt-[100px] container mx-auto'}>
                {/*// @ts-ignore*/}
                {dom[0] ? <Akciya akciya={dom[0]}/> : ''}
                <div className="container mx-auto px-2">
                    <ParamsFilter doma={doma} setFilteredDoma={setFilteredDoma} nameCurPage={useRouter().pathname}/>
                </div>
                <div className={'container mx-auto px-8'}>Нашлось {filteredDoma.length} караванов</div>
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
                    <h1 className={'mb-3 text-2xl font-bold'}>Каталог автодомов, караванов и прицепов дач от Первого
                        каравана</h1>
                    <p>Каталог автодомов, караванов и прицепов дача – это идеальное место для тех, кто ищет надежный
                        транспорт для своих путешествий и отдыха на природе. В нашем каталоге вы найдете большой выбор
                        автодомов, караванов и прицепов дача от ведущих производителей, таких как Fendt, Knaus, Tabbert,
                        Weinsberg, Hobby и много других.</p>

                    <p>В нашем каталоге вы найдете автодомы, караваны и прицепы дача разных размеров и конфигураций,
                        чтобы удовлетворить любые потребности и бюджеты. Мы предлагаем компактные модели, которые
                        идеально подойдут для пары или небольшой семьи, а также более просторные модели для больших
                        семей и групп.</p>

                    <p>Каждый автодом, караван и прицеп дача в нашем каталоге произведен из высококачественных
                        материалов и оборудован передовыми технологиями, чтобы обеспечить максимальный комфорт и
                        удобство во время путешествий и отдыха на природе. Вы найдете автодомы, оснащенные кухнями,
                        ванными комнатами, спальнями и прочими удобствами, которые делают пребывание на природе более
                        комфортным и приятным.</p>

                    <p>Наш каталог также предлагает широкий выбор моделей прицепов дача, которые идеально подойдут для
                        отдыха на природе или кемпинга. Они легкие и компактные, но в то же время просторные и удобные
                        для жизни.</p>

                    <p>Мы сотрудничаем только с надежными и проверенными производителями, чтобы обеспечить нашим
                        клиентам автодомы, караваны и прицепы дача высокого качества и надежности. В нашем каталоге вы
                        найдете модели от Fendt, Knaus, Tabbert, Weinsberg и Hobby, которые известны своими
                        инновационными технологиями и высоким уровнем качества.</p>

                    <p>Если вы ищете надежный и комфортабельный автодом, караван или прицеп дача для своих путешествий и
                        отдыха на природе, обратитесь к нашему каталогу. У нас вы найдете большой выбор моделей разных
                        размеров и брендов.</p>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export async function getStaticProps() {
    const {data: doma} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/catalog')
    const {data: dom} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/akciya')
    return {
        props: {doma, dom}, // will be passed to the page component as props
    }
}