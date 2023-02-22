import Link from "next/link";
import {useState} from "react";
import cl from './menu.module.css'

const Menu = () => {

    return (
        <header className={cl.menu}>
            <Link className={cl.btn2} href={'/'}>
                Главная
            </Link>
            <Link className={cl.btn2} href={'/catalog'}>
                Каталог
            </Link>
            <Link className={cl.btn2} href={'/pod-zakaz'}>
                Под заказ
            </Link>
            <Link className={cl.btn2} href={'/sold'}>
                Проданные
            </Link>
            <Link className={cl.btn2} href={'/tavary'}>
                Товары
            </Link>
            <Link className={cl.btn2} href={'/blog'}>
                Блог
            </Link>
        </header>
    );
};

export default Menu;