import React from 'react';
import Menu from "@/components/header/menu";
import Footer from "@/components/footer/footer";
import axios from "axios";

//@ts-ignore
export default function Tavary({tovary}) {
    return (
        <>
            <Menu/>
            <main className={'mt-28'}>
                <div className="container mx-auto px-6 pb-6">
                    <div className={'grid md:grid-cols-4 gap-8'}>
                        {/*//@ts-ignore*/}
                        {tovary.map(el => {
                            return (
                                <div key={el.id}>
                                    <div className={'h-60 relative overflow-hidden'}>
                                        <img className={'relative mx-auto'} style={{height: 'inherit'}} src={el.img}
                                             alt={el.title}/>
                                    </div>
                                    <div className={'px-4'}>
                                        <h3 className={'font-medium text-xl'}>{el.title}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
};


export async function getStaticProps() {
    const {data: tovary} = await axios.get('https://1caravan.ru/wp-json/api/v2/tovary')
    return {
        props: {tovary}, // will be passed to the page component as props
    }
}