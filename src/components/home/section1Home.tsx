import React from 'react';
import cl from './section1Home.module.css'
import {dataPreim} from "@/components/dataPreim";

const Section1Home = () => {
    const data = dataPreim
    return (
        <section className={`${cl.pochemu} py-[30px] container mx-auto px-6`}>
            <h2>Почему Первый караван?</h2>
            <div className={cl.card_fav}>
                {data.map(e => {
                    return (
                        <div key={e.id} className={cl.card_icon_fav}>
                            <div className={cl.iconca}>
                                {e.icon}
                            </div>
                            <h3>{e.title}</h3>
                            <p>{e.desc}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    );
};

export default Section1Home;