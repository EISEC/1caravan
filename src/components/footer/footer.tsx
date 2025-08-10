import React, {useEffect, useState} from 'react';
import cl from './footer.module.css'
import Link from "next/link";
import axios from "axios";
import RelatedList from "@/components/posts/relatedList";

// @ts-ignore
const Footer = () => {
    const [posts, setPosts] = useState([])
    const [ready, setReady] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 3000)
    }, [])
    useEffect(() => {
        const getPosts = async () => {
            const {data: posts} = await axios.get('https://1caravan.ru/wp-json/api/v2/posts/related')
            // @ts-ignore
            setPosts(posts)
            // @ts-ignore
        }
        getPosts()

    }, [])


    return (
        <footer className={`${cl.footer} pt-10 px-4`}>
            <div className={`container mx-auto ${cl.fotme}`}>
                <div className={cl.nameFot}>
                    <h4 className={'mb-3'}>
                        Навигация
                    </h4>
                    <ul className={cl.footer_menu}>
                        <li>
                            <Link href={'/'}>
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link href={'/catalog'}>
                                Каталог
                            </Link>
                        </li>
                        <li>
                            <Link href={'/pod-zakaz'}>
                                Под заказ
                            </Link>
                        </li>
                        {/*<li>*/}
                        {/*    <Link href={'/sold'}>*/}
                        {/*        Проданые*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        <li>
                            <Link href={'/tavary'}>
                                Товары
                            </Link>
                        </li>
                        <li>
                            <Link href={'/blog'}>
                                FAQ
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cl.nameFot}>
                    <h4 className={'mb-3'}>
                        Свежие записи
                    </h4>
                    {posts.length ? (
                        <RelatedList posts={posts}/>
                    ) : (
                        <ul>
                            <li>подождите, загружаем</li>
                        </ul>
                    )}
                </div>
                <div className={cl.widthKontakt} id={'contacts'}>
                    <h4 className={'mb-3'}>
                        Контакты
                    </h4>
                    <div className={cl.nameKontakt}>
                        <div className={cl.adress}>
                            <div>
                                <p className={cl.mtopNull}><b>Наш адрес</b></p>
                                <p>Метро Ладожская, Ленинградская область, Янино 1, Шоссейная ул. 50А</p>
                            </div>
                            <div>
                                <p className={cl.mtopNull}><b>Наш телефон</b></p>
                                <a href="tel:+79811518850" className={cl.telefonchik}>+7 (981) 151 - 88 - 50</a>
                            </div>
                            <div>
                                {!ready ? '' : <iframe
                                    title={'рейтинг'}
                                    loading="lazy"
                                    src="https://yandex.ru/sprav/widget/rating-badge/187769733343?type=rating"
                                    width="150" height="50" frameBorder="0"></iframe>}
                            </div>
                        </div>
                        <div className={cl.map}>
                            {!ready ? '' : <iframe
                                title='карта'
                                loading='lazy'
                                src='https://yandex.ru/map-widget/v1/?um=constructor%3A8e0909ee48fb0c759129f6db6cbb220188d65471000e766c8f7c5845c9c8d6ee&amp;source=constructor'
                                width='100%' height='300' frameBorder='0'/>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container mx-auto ${cl.copyrayte}`}>
                <div className={'pt-3'}>
                    <p className={cl.copy}>
                        Разработано
                        <Link href={'https://ап-студия.рф'} className={cl.apstud}> “АП-Студия.рф”</Link>
                    </p>
                    <p className={cl.copy}>
                        © “Первый караван” - Продажа автодомов, караванов, прицеп-дача.
                    </p>
                </div>
                <div className={`${cl.flexRight} pt-3`}>
                    <p className={cl.small_text}>
                        Обращаем ваше внимание на то, что данный интернет-сайт носит исключительно информационный
                        характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи
                        437 (2) Гражданского кодекса Российской Федерации.
                    </p>
                    <Link href={'/politika'} className={cl.politika}>Политика конфиденциальности</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
