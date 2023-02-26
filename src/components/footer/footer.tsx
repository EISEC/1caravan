import React from 'react';
import cl from './footer.module.css'
import Link from "next/link";
import axios from "axios";
import Script from "next/script";

// @ts-ignore
const Footer = () => {

    return (
        <footer className={cl.footer}>
            <div className={`auto_center ${cl.fotme}`}>
                <div className={cl.nameFot}>
                    <h4>
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
                        <li>
                            <Link href={'/sold'}>
                                Проданые
                            </Link>
                        </li>
                        <li>
                            <Link href={'/tavary'}>
                                Товары
                            </Link>
                        </li>
                        <li>
                            <Link href={'/blog'}>
                                Блог
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cl.nameFot}>
                    <h4>
                        Свежие записи
                    </h4>
                    <ul>

                    </ul>
                </div>
                <div className={cl.nameKontakt}>
                    <h4>
                        Контакты
                    </h4>
                    <div className={cl.adress}>
                        <div></div>
                        <div></div>
                        <div>
                            <iframe src="https://yandex.ru/sprav/widget/rating-badge/187769733343?type=rating"
                                    width="150" height="50" frameBorder="0"></iframe>
                        </div>
                    </div>
                    <div className={cl.map}>
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A8e0909ee48fb0c759129f6db6cbb220188d65471000e766c8f7c5845c9c8d6ee&amp;source=constructor"
                            width="100%" height="300" frameBorder="0"></iframe>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
