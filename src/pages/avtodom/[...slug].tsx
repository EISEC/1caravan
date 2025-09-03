import React, {useCallback, useEffect, useState} from "react";
import Menu from "@/components/header/menu";
import Head from "next/head";
import cl from "./slug.module.css"
import Footer from "@/components/footer/footer";
import 'react-tabs/style/react-tabs.css';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {GiCaravan, GiKitchenTap, GiMeal, GiNotebook, GiPersonInBed, GiWarpPipe} from "react-icons/gi";

import Modal from '@/components/Modal/Modal';
import {TAddItem} from "@/components/types";
import {mockData} from "@/components/mocData";
import Status from "@/components/SingleDom/Status";
import Gallary from "@/components/SingleDom/gallary";
import Dopy from "@/components/SingleDom/dopy";
import Collaps from "@/components/Modal/Collaps";
import {NextSeo, ProductJsonLd} from "next-seo";
import {useRouter} from "next/router";
import Quize from "@/components/Quize";
import {AddWish, delWish} from "@/store/slice/wishlist";
import {AddComp, delet} from "@/store/slice/compare";
import {FaHeart, FaRegTrashAlt} from "react-icons/fa";
import {ImShuffle} from "react-icons/im";
import {useAppDispatch, useAppSelector} from "@/store/store";
import Toast from "@/components/Toast/toast";


// @ts-ignore
export default function Post({post}) {
    const route = useRouter();
    const [isMobile, setIsMobile] = useState(false)
    // @ts-ignore
    useEffect(() => {
        setIsMobile(window.matchMedia('(max-width: 600px)').matches)
    }, [])

    // @ts-ignore
    const {compareList} = useAppSelector(state => state.compare)
    // @ts-ignore
    const {wishList} = useAppSelector(state => state.wishlist)

    const dispatch = useAppDispatch();


    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    function getFormatPrice(price: string) {
        const pRes = Number(price)
        const formatPrice = String(pRes).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        return formatPrice
    }

    const [acf, setAcf] = useState(post.acf)
    const proizvoditeli_karavanov = post.proizvoditeli_karavanov
    const proizvoditel = proizvoditeli_karavanov != 0 && (post.proizvoditel[0])
    const title = post.title
    const content = post.content
    const statusDom = post.acf.status
    const strana = post.acf.strana_proiz
    const massa = post.acf.mass_pusto
    const max_massa = post.acf.Max_mass
    const mesta = post.acf.kol_sleep
    const sanuzel = post.acf.dopy
    const vin = post.acf.vin
    const god_vipuska = post.acf.god_vipuska
    // post._embedded['wp:term'][1][0].name
    const acfGall = post.acf.gallery_avtod
    const glavFoto = post.img
    const preim = post.acf.ospreim
    const razmer = post.acf.osnova
    const dop = acf.дополнительно


    const getAllAddonItems = () => {
        const res: TAddItem[] = []
        mockData.forEach(el => el.categoryItems.forEach(el => el.info.forEach(el => res.push(el))))
        return res
    }


    const [addIdList, setAddIdList] = useState<string[]>([])

    const handleClickAddItem = (id: string) => {
        const curIndex = addIdList.findIndex(el => el === id)
        if (curIndex === -1) setAddIdList(prev => [...prev, id])
        else setAddIdList(prev => [...(prev.slice(0, curIndex)), ...(prev.slice(curIndex + 1))])
    }

    const allAddonItems = getAllAddonItems()

    const getPriceWithAddons = useCallback(() => {
        const addonsPrice = addIdList.reduce((acc, cur) => {
            const addingPriceItem = allAddonItems.find(el => el.id === cur)
            acc += addingPriceItem ? addingPriceItem.price : 0
            return acc
        }, 0)
        return post.prices_sale ? post.prices_sale + addonsPrice : post.price + addonsPrice
    }, [addIdList])

    const isActiveAddon = (id: string) => {
        return addIdList.find(el => el === id)
    }

    const pickedAddons = () => {
        return addIdList.map((curId, idx) => {
            return allAddonItems.find(el => el.id === curId)
        })
    }
    const clearAddons = () => {
        setAddIdList([])
    }

    const [carAddon, setCarAddon] = useState(mockData[0].catId)
    const tabcat = (id: string) => {
        setCarAddon(id)
    }
    let knopka
    if (statusDom == 'Выбрать' || statusDom == 'В пути') {
        knopka = 'Забронировать'
    } else if (statusDom == 'Продан' || statusDom == 'Под заказ' || statusDom == 'Забронирован') {
        knopka = 'Хочу такой'
    } else {
        knopka = 'Оставить заявку'
    }

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalQuiz, setModalQuiz] = useState(false)

    const [curDesc, setCurDesc] = useState(1)

    const naruzha = {
        dlina: acf.длина_каравана,
        shirina: acf.ширина_каравана_копия,
        visota: acf.высота_каравана_копия2
    }

    const [click, setClick] = useState(false)
    setTimeout(() => setClick(false), 1000)

    const [delclick, setDelclick] = useState(false)
    setTimeout(() => setDelclick(false), 1000)

    //@ts-ignore
    const sendToCart = (slug, title, price, img, status) => {
        //@ts-ignore
        dispatch(AddWish({slug, title, price, img, status}))
        //@ts-ignore
        setClick(true)
    }
    //@ts-ignore
    const sendToComp = (slug, title, price, img) => {
        //@ts-ignore
        dispatch(AddComp({slug, title, price, img}))
        //@ts-ignore
        setClick(true)
    }

    const [disableComp, setDisableComp] = useState(false)
    useEffect(() => {
        // let disableList
        //@ts-ignore
        const FindComp = compareList.findIndex(list => list.slug === post.slug)
        // @ts-ignore
        // setDisable(FindWish)
        if (FindComp === -1) {
            setDisableComp(false)
        } else {
            setDisableComp(true)
        }
    }, [compareList])

    const [disableList, setDisableList] = useState(false)
    useEffect(() => {
        //@ts-ignore
        const FindWish = wishList.findIndex(list => list.slug === post.slug)
        // @ts-ignore
        if (FindWish === -1) {
            setDisableList(false)
        } else {
            setDisableList(true)
        }
    }, [wishList])
    //@ts-ignore
    const deletCompare = (slug, title, price, img) => {
        //@ts-ignore
        dispatch(delet({slug, title, price, img}))
        //@ts-ignore
        setDelclick(true)
    }
    //@ts-ignore
    const deletWish = (slug, title, price, img, status) => {
        //@ts-ignore
        dispatch(delWish({slug, title, price, img, status}))
        //@ts-ignore
        setDelclick(true)
    }

    const bgInvert = (bol: boolean) => bol ? 'bg-[#515A89]' : ''
    // @ts-ignore
    return (
        <>
            <NextSeo
                title={title.replace(/&#8212;/g, '-')}
                description={`Купить/Заказать дом на колесах ${title} от производителя автодомов ${proizvoditel}. Актуальная информация и приятная цена ждут Вас на нашем сайте! Подберем автодом/прицеп-дачу/караван под ваши пожелания`}
                openGraph={{
                    title: `${title.replace(/&#8212;/g, '-')}`,
                    description: `Купить/Заказать дом на колесах ${title} от производителя автодомов ${proizvoditel}. Актуальная информация и приятная цена ждут Вас на нашем сайте! Подберем автодом/прицеп-дачу/караван под ваши пожелания`,
                    images: [
                        {
                            url: `${glavFoto}`,
                            width: 800,
                            height: 600,
                            alt: 'Первый караван',
                            type: 'image/jpeg',
                        },
                    ],
                    siteName: 'Первый караван',
                }}
            />
            <ProductJsonLd
                productName={title.replace(/&#8212;/g, '-')}
                images={[
                    glavFoto
                ]}
                description={`Купить/Заказать дом на колесах ${title} от производителя автодомов ${proizvoditel}. Актуальная информация и приятная цена ждут Вас на нашем сайте! Подберем автодом/прицеп-дачу/караван под ваши пожелания`}
                brand={proizvoditel}
                color="white"
                manufacturerName={proizvoditel}
                manufacturerLogo="/logo.svg"
                material="steel"
                slogan="Подберем автодом/прицеп-дачу/караван под ваши пожелания!"
                disambiguatingDescription="Автодома для путеществий и проживания."
                releaseDate={post.date}
                productionDate={post.date}
                purchaseDate={post.date}
                aggregateRating={{
                    ratingValue: '4.4',
                    reviewCount: '89',
                }}
                offers={[
                    {
                        price: `${getFormatPrice(getPriceWithAddons())}`,
                        priceCurrency: 'RUB',
                        itemCondition: 'https://schema.org/UsedCondition',
                        availability: 'https://schema.org/InStock',
                        url: `https://1caravan.ru${route.asPath}`,
                        seller: {
                            name: 'Первый караван',
                        },
                    },
                ]}
                mpn={`SKU${post.id}`}
            />
            <Head>
                <meta name="keywords"
                      content={`купить, автодом, караван, прицеп дачу, ${proizvoditel}, ${title}, ${post.god_vipuska}`}/>
            </Head>
            <Menu/>
            <main className={cl.main}>
                <section className={cl.topheader}>
                    <div className={`container flex flex-row gap-4 items-center px-6 py-2 mx-auto ${cl.topcaravan}`}>
                        <h1 className={'font-bold text-xl md:text-4xl'}>{title} </h1>
                        {vin ? <span className={`min-w-[70px] md:text-xl ${cl.vin}`}>№ {vin}</span> : ''}
                    </div>
                </section>
                <section
                    className={`${cl.glavnay_po_caravanu} container md:flex md:flex-col md:gap-[20px] px-6 py-6 mx-auto glavnay_po_caravanu`}>
                    <Gallary title={title} glavFoto={glavFoto} setThumbsSwiper={setThumbsSwiper} acfGall={acfGall}
                             thumbsSwiper={thumbsSwiper}/>
                    <div className={`opisaniye ${cl.opisaniye}`}>
                        <ul className={'text-xl md:text-2xl'}>
                            {/*// @ts-ignore*/}
                            <Status status={statusDom}/>
                            <li><b>Год выпуска</b>: {god_vipuska}</li>
                            <li><b>Страна</b>: {strana}</li>
                            <li><b>Фактическая масса</b>: {massa} кг</li>
                            <li><b>Максимальная масса</b>: {max_massa} кг</li>
                            <li><b>Спальных мест</b>: {mesta}</li>
                            <li><b>Тип санузла</b>: {sanuzel}</li>
                        </ul>

                        <div
                            className={`${post.prices_sale != 0 ? cl.Cina : cl.Sisny} inline-block px-6 mt-6 relative ${post.prices_sale != 0 ? 'mt-[28px]' : ''}`}>
                            {post.prices_sale ?
                                (
                                    <p className={`${cl.salePrice} absolute -top-[22px] text-[16px]`}>{getFormatPrice(post.price)} ₽</p>
                                ) : null
                            }

                            <p className={`${cl.usualPrice} ${statusDom == 'Выбрать' && post.prices_sale != 0 ? cl.redprice : ''} ${statusDom == 'В пути' && post.prices_sale != 0 ? cl.redprice : ''}`}>
                                {post.prices_sale ? getFormatPrice(post.prices_sale) : getFormatPrice(post.price)} ₽
                            </p>
                        </div>
                        <div className="btns mt-3 flex flex-col gap-2">
                            <button onClick={() => setModalIsOpen(true)}
                                    className={'px-6 w-full py-4 bg_green rounded-xl text-xl text-white hover:scale-90 transition'}>{knopka}</button>
                            <div className={`grid ${!isMobile ? 'grid-cols-2': 'grid-cols-1'} gap-2 py-2`}>
                                {!isMobile && <button
                                    onClick={disableComp ? () => deletCompare(post.slug, post.title, post.price, post.img) : () => sendToComp(post.slug, post.title, post.price, post.img)}
                                    className={'flex flex-row border-blue-600 border-2 py-2 rounded items-center justify-center gap-2 disabled:bg-blue-200 disabled:text-white disabled:border-blue-200 disabled:cursor-no-drop transition hover:scale-90'}>
                                    {disableComp ? 'В Сравнении' : 'Сравнить'}{disableComp ?
                                    <FaRegTrashAlt className={'text-red-700'}/> :
                                    <ImShuffle className={'text-blue-600'}/>} </button>}
                                <button
                                    onClick={disableList ? () => deletWish(post.slug, post.title, post.price, post.img, statusDom) : () => sendToCart(post.slug, post.title, post.price, post.img, statusDom)}
                                    className={'flex flex-row border-red-700 border-2 py-2 rounded items-center justify-center gap-2 disabled:bg-red-200 disabled:text-white disabled:border-red-200 disabled:cursor-no-drop transition hover:scale-90'}>
                                    {disableList ? 'В Избранном' : 'Изранное'}{disableList ?
                                    <FaRegTrashAlt className={'text-red-700'}/> :
                                    <FaHeart className={'text-red-700'}/>}</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={'butonsy container mx-auto px-2 py-6'}>
                    <ul className={'grid grid-cols-2 md:grid-cols-3 md:gap-8 gap-2 px-4 break-words'}>
                        <li onClick={() => setCurDesc(1)}
                            className={`text-xs bg_grey f_dark cursor-pointer shadow-xl p-4 md:py-6 rounded-xl flex flex-col md:flex-row items-center justify-center gap-[8px] md:gap-[15px] md:text-2xl hover:bg-[#515A89] hover:text-white hover:scale-90 transition
                                ${curDesc === 1 ? `${cl.active} scale-90` : ''}`}>
                            Наружная часть
                            <GiCaravan className={'text-[36px]'}/>
                        </li>
                        <li onClick={() => setCurDesc(2)}
                            className={`text-xs bg_grey f_dark cursor-pointer shadow-xl p-4 md:py-6 rounded-xl flex flex-col md:flex-row items-center justify-center gap-[8px] md:gap-[15px] md:text-2xl hover:bg-[#515A89] hover:text-white hover:scale-90 transition
                                ${curDesc === 2 ? `${cl.active} scale-90` : ''}`}>
                            Жилая зона
                            <GiPersonInBed className={'text-[36px]'}/>
                        </li>
                        <li onClick={() => setCurDesc(3)}
                            className={`text-xs bg_grey f_dark cursor-pointer shadow-xl p-4 md:py-6 rounded-xl flex flex-col md:flex-row items-center justify-center gap-[8px] md:gap-[15px] md:text-2xl hover:bg-[#515A89] hover:text-white hover:scale-90 transition
                            ${curDesc === 3 ? `${cl.active} scale-90` : ''}`}>
                            Кухня
                            <GiMeal className={'text-[36px]'}/>
                        </li>
                        <li onClick={() => setCurDesc(4)}
                            className={`text-xs bg_grey f_dark cursor-pointer shadow-xl p-4 md:py-6 rounded-xl flex flex-col md:flex-row items-center justify-center gap-[8px] md:gap-[15px] md:text-2xl hover:bg-[#515A89] hover:text-white hover:scale-90 transition
                            ${curDesc === 4 ? `${cl.active} scale-90` : ''}`}>
                            Санузел
                            <GiWarpPipe className={'text-[36px]'}/>
                        </li>
                        <li onClick={() => setCurDesc(5)}
                            className={`text-xs bg_grey f_dark cursor-pointer shadow-xl p-4 md:py-6 rounded-xl flex flex-col md:flex-row items-center justify-center gap-[8px] md:gap-[15px] md:text-2xl hover:bg-[#515A89] hover:text-white hover:scale-90 transition
                            ${curDesc === 5 ? `${cl.active} scale-90` : ''}`}>
                            Водоснабжение
                            <GiKitchenTap className={'text-[36px]'}/>
                        </li>
                        <li onClick={() => setCurDesc(6)}
                            className={`text-xs bg_grey f_dark cursor-pointer shadow-xl p-4 md:py-6 rounded-xl flex flex-col md:flex-row items-center justify-center gap-[8px] md:gap-[15px] md:text-2xl hover:bg-[#515A89] hover:text-white hover:scale-90 transition
                            ${curDesc === 6 ? `${cl.active} scale-90` : ''}`}>
                            Дополнительно
                            <GiNotebook className={'text-[36px]'}/>
                        </li>
                    </ul>
                    <Collaps isOpen={curDesc === 1}>
                        <h3 className={'font-bold text-xl mb-3'}>Наружная часть</h3>
                        <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>
                            <ul className={'pl-2 flex flex-col gap-2'}>
                                <li>Длина - <strong>{naruzha.dlina}</strong> см</li>
                                <li>Ширина - <strong>{naruzha.shirina}</strong> см</li>
                                <li>Высота - <strong>{naruzha.visota}</strong> см</li>
                                <li>Тягово-сцепное устройство - <strong>{acf.тягово_сцепное_устройство}</strong></li>
                                <li>Дополнительная боковая фиксация сцепного устройства
                                    - <strong>{acf.дополнительная_боковая_фиксация_сцепного_устройства ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Страховочный тормозной трос
                                    - <strong>{acf.страховочный_тормозной_трос ? 'Есть' : 'Нет'}</strong></li>
                                <li>Вилка для подключения к автомобилю
                                    - <strong>{acf.вилка_для_подключения_к_автомобилю}</strong></li>
                                <li>Электрическая система стабилизации
                                    - <strong>{acf.электрическая_система_стабилизации}</strong></li>
                                <li>Противооткаты - <strong>{acf.противооткаты ? 'Есть' : 'Нет'}</strong></li>
                                <li>Штатное место для акб
                                    - <strong>{acf.штатное_место_для_акб ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Наружная розетка 220 - <strong>{acf.наружная_розетка_220 ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Наружное подключение газового оборудования гриляплиты
                                    - <strong>{acf.наружное_подключение_газового_оборудования_гриляплиты ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Наружное подключение воды английская система
                                    - <strong>{acf.наружное_подключение_воды_английская_система ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Входная дверь - <strong>{acf.входная_дверь}</strong></li>
                                <li>Ступенька для входа - <strong>{acf.ступенька_для_входа ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Москитная сетка на дверях
                                    - <strong>{acf.москитная_сетка_на_дверях ? 'Есть' : 'Нет'}</strong></li>
                                <li>Мусорное ведро - <strong>{acf.мусорное_ведро ? 'Есть' : 'Нет'}</strong></li>
                                <li>Ящики для вещей на входной двери
                                    - <strong>{acf.ящики_для_вещей_на_входной_двери ? 'Есть' : 'Нет'}</strong></li>
                                <li>Окно на входной двери
                                    - <strong>{acf.окно_на_входной_двери ? 'Есть' : 'Нет'}</strong>
                                </li>
                                <li>Наружное освещение у входа
                                    - <strong>{acf.наружное_освещение_у_входа ? 'Есть' : 'Нет'}</strong></li>
                                <li>Подготовка под велобагажник
                                    - <strong>{acf.подготовка_под_велобагажник ? 'Есть' : 'Нет'}</strong></li>
                                <li>Система сборки - <strong>{acf.система_сборки}</strong></li>
                            </ul>
                            <div className={'hidden md:flex relative top-0 right-14 flex-col gap-8'}>
                                <div className={'relative flex flex-col gap-3'}>
                                    <div
                                        className={'dlina text-center absolute bottom-0 w-full border-b-[1px] border-black'}>
                                        {naruzha.dlina} см
                                    </div>
                                    <div
                                        className={'visota text-center absolute left-0 w-min border-r-[1px] border-black flex flex-col h-full justify-between'}>
                                        <span>{naruzha.visota} см</span>
                                    </div>
                                    <img src="/dlina.webp" alt="Чертеж каравана"/>
                                </div>
                                <div className={'flex flex-col items-center justify-center relative'}>
                                    <img src="/shiry.webp" className={'max-w-[260px]'} alt="Чертеж каравана"/>
                                    <div
                                        className={'shiran max-w-[240px] absolute text-center absolute bottom-0 w-full border-b-[1px] border-black'}>
                                        <span className={'absolute right-0 left-0 top-2'}>{naruzha.shirina} см</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Collaps>
                    <Collaps isOpen={curDesc === 2}>
                        <h3 className={'font-bold text-xl mb-3'}>Жилая зона</h3>
                        <ul className={'pl-2 flex flex-col gap-2'}>
                            <li>Отопление : <strong
                                dangerouslySetInnerHTML={{__html: acf.отопление.replace(/-|–|—/g, '<br>$&')}}/></li>
                            <li>Раздув теплого воздуха - <strong>{acf.раздув_теплого_воздуха}</strong></li>
                            <li>Дефлекторы раздува - <strong>{acf.дефлекторы_раздува}</strong></li>
                            <li>Панель управления отоплением и бойлером
                                - <strong>{acf.панель_управления_отоплением_и_бойлером}</strong></li>
                            <li>Датчик угарного газа - <strong>{acf.датчик_угарного_газа ? 'Есть' : 'Нет'}</strong>
                            </li>
                            <li>Датчик дыма - <strong>{acf.датчик_дыма ? 'Есть' : 'Нет'}</strong></li>
                            <li>Вольтметр - <strong>{acf.вольтметр ? 'Есть' : 'Нет'}</strong></li>
                            <li>Место для установки телевизора
                                - <strong>{acf.место_для_установки_телевизора ? 'Есть' : 'Нет'}</strong></li>
                            <li>ТВ антенна - <strong>{acf.тв_антенна ? 'Есть' : 'Нет'}</strong></li>
                            <li>Аудиосистема - <strong>{acf.аудиосистема ? 'Есть' : 'Нет'}</strong></li>
                            <li>Магнитола - <strong>{acf.магнитола ? 'Есть' : 'Нет'}</strong></li>
                            <li>Зонирование прицепа дверьюшторами
                                - <strong>{acf.зонирование_прицепа_дверьюшторами ? 'Есть' : 'Нет'}</strong></li>
                            <li>Спальных зон - <strong>{acf.спальных_зон}</strong></li>
                            <li>Потолочный люк - <strong>{acf.потолочный_люк}</strong></li>
                            <li>Москитные сетки на окнахлюках
                                - <strong>{acf.москитные_сетки_на_окнахлюках ? 'Есть' : 'Нет'}</strong></li>
                            <li>Солнцезащитные шторки на окнахлюках
                                - <strong>{acf.солнцезащитные_шторки_на_окнахлюках ? 'Есть' : 'Нет'}</strong></li>
                            <li>Шторы-тюли - <strong>{acf.шторы__тюли ? 'Есть' : 'Нет'}</strong></li>
                            <li>Полкиящики для хранения_вещей
                                - <strong>{acf.полкиящики_для_хранения_вещей ? 'Есть' : 'Нет'}</strong></li>
                            <li>Большой шкаф для хранения вещей
                                - <strong>{acf.большой_шкаф_для_хранения_вещей ? 'Есть' : 'Нет'}</strong></li>
                            <li>Доводчики мебели - <strong>{acf.доводчики_мебели}</strong></li>
                            <li>Журнальный столик - <strong>{acf.журнальный_столик ? 'Есть' : 'Нет'}</strong></li>
                            <li>Зеркало - <strong>{acf.зеркало ? 'Есть' : 'Нет'}</strong></li>
                            <li>Количество зеркал - <strong>{acf.количество_зеркал}</strong></li>
                            <li>Ковры для пола - <strong>{acf.ковры_для_пола ? 'Есть' : 'Нет'}</strong></li>
                        </ul>

                    </Collaps>
                    <Collaps isOpen={curDesc === 3}>
                        <h3 className={'font-bold text-xl mb-3'}>Кухня</h3>
                        <ul className={'pl-2 flex flex-col gap-2'}>
                            <li>Плита газовая - <strong>{acf.плита_газовая ? 'Есть' : 'Нет'}</strong></li>
                            <li>Количество конфорок - <strong>{acf.количество_конфорок}</strong></li>
                            <li>Плита электрическая - <strong>{acf.плита_электрическая ? 'Есть' : 'Нет'}</strong></li>
                            {acf.количество_конфорок_2 ?
                                <li>Количество конфорок 2 - <strong>{acf.количество_конфорок_2}</strong></li> : ''}
                            <li>Газовый духовой шкаф - <strong>{acf.газовый_духовой_шкаф ? 'Есть' : 'Нет'}</strong>
                            </li>
                            <li>Газовый гриль - <strong>{acf.газовый_гриль ? 'Есть' : 'Нет'}</strong></li>
                            <li>Мойка - <strong>{acf.мойка ? 'Есть' : 'Нет'}</strong></li>
                            <li>Холодильник: <strong
                                dangerouslySetInnerHTML={{__html: acf.холодильник.replace(/-|–|—/g, '<br>$&')}}/></li>
                            <li>Микроволновая печь - <strong>{acf.микроволновая_печь ? 'Есть' : 'Нет'}</strong></li>
                            <li>Вытяжка в кухне - <strong>{acf.вытяжка_в_кухне ? 'Есть' : 'Нет'}</strong></li>
                            <li>Приточно вытяжная система
                                - <strong>{acf.приточно_вытяжная_система ? 'Есть' : 'Нет'}</strong></li>
                            <li>Место для хранения посуды
                                - <strong>{acf.место_для_хранения_посуды ? 'Есть' : 'Нет'}</strong></li>
                            <li>Барная полка - <strong>{acf.барная_полка ? 'Есть' : 'Нет'}</strong></li>
                            <li>Рабочая кухонная поверхность
                                - <strong>{acf.рабочая_кухонная_поверхность ? 'Есть' : 'Нет'}</strong></li>
                            <li>Дополнительная рабочая кухонная поверхность столик
                                - <strong>{acf.дополнительная_рабочая_кухонная_поверхность_столик ? 'Есть' : 'Нет'}</strong>
                            </li>
                            <li>Обеденный стол - <strong>{acf.обеденный_стол ? 'Есть' : 'Нет'}</strong></li>
                        </ul>
                    </Collaps>
                    <Collaps isOpen={curDesc === 4}>
                        <h3 className={'font-bold text-xl mb-3'}>Санузел</h3>
                        <ul className={'pl-2 flex flex-col gap-2'}>
                            <li>Унитаз - <strong>{acf.унитаз ? 'Есть' : 'Нету'}</strong></li>
                            <li>Бачок смыва туалета - <strong>{acf.бачок_смыва_туалета}</strong></li>
                            <li>Смыв туалета - <strong>{acf.смыв_туалета}</strong></li>
                            <li>Индикатор заполнения кассеты туалета
                                - <strong>{acf.индикатор_заполнения_кассеты_туалета ? 'Есть' : 'Нет'}</strong></li>
                            <li>Регулировка положения унитаза
                                - <strong>{acf.регулировка_положения_унитаза ? 'Есть' : 'Нет'}</strong></li>
                            <li>Душевая кабина - <strong>{acf.душевая_кабина}</strong></li>
                            <li>Ванная раковина - <strong>{acf.ванная_раковина ? 'Есть' : 'Нет'}</strong></li>
                        </ul>
                    </Collaps>
                    <Collaps isOpen={curDesc === 5}>
                        <h3 className={'font-bold text-xl mb-3'}>Водоснаюжение</h3>
                        <ul className={'pl-2 flex flex-col gap-2'}>
                            <li>Бак для воды - <strong>{acf.бак_для_воды ? 'Есть' : 'Нет'}</strong></li>
                            {acf.объем_бака_для_воды ?
                                <li>Объем бака для воды - <strong>{acf.объем_бака_для_воды}</strong></li> : ''}
                            {acf.индикатор_уровня_воды_в_баке ?
                                <li>Индикатор уровня воды в баке
                                    - <strong>{acf.индикатор_уровня_воды_в_баке ? `Есть` : 'Нет'}</strong>
                                </li> : ''}
                            <li>Подогрев воды : <strong
                                dangerouslySetInnerHTML={{__html: acf.подогрев_воды.replace(/-|–|—/g, '<br>$&')}}/></li>
                            <li>Слив воды из бойлера - <strong style={{textTransform: 'lowercase'}}>{acf.слив_воды_из_бойлера}</strong></li>
                        </ul>
                    </Collaps>
                    <Collaps isOpen={curDesc === 6}>
                        {dop ? <Dopy dopy={dop} compare={false}/> : ''}
                    </Collaps>
                </section>
                <section className={'container mx-auto px-6 py-6'}>
                    <h2 className={'text-xl font-bold pb-2'}>Краткое описание:</h2>
                    <div className={'flex flex-col-reverse md:flex-row items-center gap-3'}>
                        <div className={'min-w-[40%] w-full'}
                             dangerouslySetInnerHTML={{__html: content.replace(/—|-|–|—/g, '<br>$&')}}/>
                        {acf.videob ? <div className={'p-[8px] bg-gray-400 rounded-lg shadow-xl w-full'}>
                            <iframe
                                className={'w-full md:w-[100%] max-w-[1220px] h-[30vh] rounded-lg'}
                                src={`https://www.youtube.com/embed/${acf.videob}`}
                                allow='autoplay; encrypted-media'
                                title='video'
                                width={800}
                                height={450}
                            />
                        </div> : ''}
                    </div>
                </section>

                {!isMobile ? <section className={'container mx-auto my-3 px-4'}>
                    <h2 className={'text-xl font-bold pb-2 px-4'}>Дополнительно можно оборудовать:</h2>
                    <div className={'flex flex-col gap-6 rounded-md p-2 mb-[20px]'}>
                        <ul className={'font-medium grid grid-cols-2 md:grid-cols-4 gap-3'}>
                            {mockData.map(category => (
                                // @ts-ignore
                                <li onClick={() => tabcat(category.catId)} key={category.catId}
                                    className={`flex gap-4 p-2 rounded-md cursor-pointer flex items-center transition justify-center border-[2px] border-[#515A89] hover:bg-[#515A89] hover:text-white ${category.catId === carAddon ? 'bg-[#515A89] text-white' : ''}`}>
                                    <h4>{category.categoryName}</h4>
                                </li>
                            ))}
                        </ul>
                        <div className={'w-full'}>
                            {mockData.map(category => (
                                <div key={category.catId}
                                     className={category.catId === carAddon ? 'flex flex-col rounded-md gap-2' : 'hidden'}>
                                    {category.categoryItems.map(itemList => (
                                        <div key={itemList.itemListName}
                                             className={'flex flex-row items-center gap-4 w-full bg-white border-[2px] rounded-md border-[#908859]'}>
                                            <h3 className={'min-w-[250px] w-[250px] p-2'}>{itemList.itemListName}</h3>
                                            <div className={`${cl.Column} gap-2 w-full`}>
                                                {itemList.info.map(({title, descr, id, price}) => (
                                                    <div
                                                        className={`flex flex-row gap-4 w-full items-center p-1 h-full`}
                                                        key={id}
                                                    >
                                                        <div className={'min-w-[250px] w-[250px]'}>{title}</div>
                                                        {/*// @ts-ignore*/}
                                                        <div className={'min-w-[150px] w-[150px] text-right'}>
                                                            {/*// @ts-ignore*/}
                                                            <strong>{getFormatPrice(price)} ₽</strong></div>
                                                        <div className={'w-full'}>{descr}</div>
                                                        <button

                                                            className={isActiveAddon(id) ? 'cursor-pointer bg-red-700 text-white min-w-[130px] min-h-[45px] rounded-md border-[1px] shadow-md hover:bg-red-800 transition' : 'cursor-pointer bg-[#5E875F] text-white min-w-[130px] min-h-[45px] rounded-md border-[1px] shadow-md hover:bg-[#1b401c] transition'}
                                                            onClick={() => handleClickAddItem(id)}>
                                                            {isActiveAddon(id) ? 'Убрать -' : 'Добавить +'}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={'flex flex-row gap-3 justify-between items-center px-2'}>
                        <h3 className={'bg-[#222225] text-white text-lg px-3 py-2 rounded'}>Итоговая цена:
                            ~ <strong>{getFormatPrice(getPriceWithAddons())} ₽</strong></h3>
                        <button className={'bg-amber-700 px-[10px] py-[5px] rounded-md text-white'}
                                onClick={() => clearAddons()}>
                            Очистить
                        </button>
                    </div>
                </section> : ''}
            </main>
            <Footer/>

            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <h2>Modal Content</h2>
                <form action="" className={'transition duration-700 ease-in-out'}>
                    <input type="text" name="dfsd" id="dsf"/>
                    <input type="text" name='sads'/>
                    <textarea className={'hidden'}>
                        {pickedAddons().length && pickedAddons().map(el => {
                            return (
                                //@ts-ignore
                                <div key={el.id}>{el.title}</div>
                            )

                        })}
                    </textarea>
                    <input type="submit" value="Оставить заявку"/>
                </form>
            </Modal>
            <Modal isOpen={modalQuiz} onClose={() => setModalQuiz(false)}>
                <Quize/>
            </Modal>
            <Toast click={click} text={'Добавлено'}/>
            <Toast click={delclick} text={'Удалено'}/>
        </>
    )
}


// @ts-ignore
export async function getServerSideProps({params}) {
    const res = await fetch(`https://1caravan.ru/wp-json/api/v2/doma/${params.slug}`)
    const [post] = await res.json()
    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {post, revalidate: 1}, // will be passed to the page component as props
    }
}