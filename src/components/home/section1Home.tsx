import React from 'react';
import cl from './section1Home.module.css'
import {dataPreim} from "@/components/dataPreim";

const Section1Home = () => {
    const data = dataPreim
    return (
        <section className={`${cl.pochemu} py-[30px] container mx-auto px-6`}>
            {/*<h2 className={'mb-3'}>Почему Первый караван?</h2>*/}
            <div className={cl.card_fav}>
                {data.map(e => {
                    return (
                        <div key={e.id} className={'flex flex-row justify-center items-center gap-2 p-[10px] rounded-[15px] border-[1px] border-[#FF9800]'}>
                            <div className={'text-6xl items-center justify-center flex p-[10px] rounded-[15px] border-[1px]'}>
                                {e.icon}
                            </div>
                            <div>
                                <h3 className={'font-semibold'}>{e.title}</h3>
                                <p>{e.desc}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    );
};

export default Section1Home;