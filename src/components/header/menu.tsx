import Link from "next/link";
import {useState} from "react";
import cl from './menu.module.css'

const Menu = () => {


    return (
        <header className={cl.menu}>

            {/*// @ts-ignore*/}
            <nav itemscope="" itemtype="https://schema.org/SiteNavigationElement">
                {/*// @ts-ignore*/}
                <ul itemprop="about" itemscope="" itemtype="https://schema.org/ItemList">
                    {/*// @ts-ignore*/}
                    <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ItemList">
                        {/*// @ts-ignore*/}
                        <Link className={cl.btn2} href={'/'} itemprop="url">
                            Главная
                        </Link>
                        <meta itemProp="name" content="Главная"/>
                    </li>
                    {/*// @ts-ignore*/}
                    <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ItemList">
                        {/*// @ts-ignore*/}
                        <Link className={cl.btn2} href={'/catalog'} itemprop="url">
                            Каталог
                        </Link>
                        <meta itemProp="name" content="Каталог"/>
                    </li>
                    {/*// @ts-ignore*/}
                    <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ItemList">
                        {/*// @ts-ignore*/}
                        <Link className={cl.btn2} href={'/pod-zakaz'} itemprop="url">
                            Под заказ
                        </Link>
                        <meta itemProp="name" content="Под заказ"/>
                    </li>
                    {/*// @ts-ignore*/}
                    <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ItemList">
                        {/*// @ts-ignore*/}
                        <Link className={cl.btn2} href={'/sold'} itemprop="url">
                            Проданые
                        </Link>
                        <meta itemProp="name" content="Проданные"/>
                    </li>
                    {/*// @ts-ignore*/}
                    <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ItemList">
                        {/*// @ts-ignore*/}
                        <Link className={cl.btn2} href={'/tavary'} itemprop="url">
                            Товары
                        </Link>
                        <meta itemProp="name" content="Товары"/>
                    </li>
                    {/*// @ts-ignore*/}
                    <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ItemList">
                        {/*// @ts-ignore*/}
                        <Link className={cl.btn2} href={'/blog'} itemprop="url">
                            Блог
                        </Link>
                        <meta itemProp="name" content="Блог"/>
                    </li>
                </ul>
            </nav>

        </header>
    );
};

export default Menu;