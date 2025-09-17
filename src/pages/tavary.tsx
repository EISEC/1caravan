import React from 'react';
import Head from 'next/head';
import Menu from "@/components/header/menu";
import Footer from "@/components/footer/footer";
import ProductsGrid from "@/components/Products/ProductsGrid";
import axios from "axios";

interface Product {
    id: string;
    title: string;
    img: string;
    price?: string;
    description?: string;
    slug?: string;
    category?: string;
    status?: string;
}

interface TavaryProps {
    tovary: Product[];
}

export default function Tavary({ tovary }: TavaryProps) {
    return (
        <>
            <Head>
                <title>Товары для караванов | Первый Караван</title>
                <meta name="description" content="Широкий ассортимент товаров и аксессуаров для караванов, автодомов и кемперов. Качественные товары по доступным ценам." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Menu/>
            
            <main className="mt-28">
                {/* Сетка товаров */}
                <ProductsGrid 
                    products={tovary}
                    title="Товары для караванов"
                    subtitle="Широкий ассортимент качественных товаров и аксессуаров для вашего каравана, автодома или кемпера"
                />
            </main>
            
            <Footer/>
        </>
    );
};


export async function getServerSideProps() {
    try {
        const {data: tovary} = await axios.get('https://1caravan.ru/wp-json/api/v2/tovary')
        return {
            props: {tovary}, // will be passed to the page component as props
        }
    } catch (error) {
        console.error('Error fetching products:', error)
        return {
            props: {tovary: []}, // Return empty array on error
        }
    }
}