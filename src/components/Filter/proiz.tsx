import React from 'react';
import Link from "next/link";

const Proiz = () => {
    return (
        <section className={'container mx-auto my-3'}>
            <div className="flex gap-2  flex-row justify-between">
                <Link className={'w-full text-center leading-[70px] text-white text-2xl font-extrabold bg-orange-500 rounded-lg'} href={'/proizvoditel/fendt'}>
                    Fendt
                </Link>
                <Link className={'w-full text-center leading-[70px] text-white text-2xl font-extrabold bg-orange-500 rounded-lg'} href={'/proizvoditel/hobby'}>
                    Hobby
                </Link>
                <Link className={'w-full text-center leading-[70px] text-white text-2xl font-extrabold bg-orange-500 rounded-lg'} href={'/proizvoditel/knaus'}>
                    Knaus
                </Link>
                <Link className={'w-full text-center leading-[70px] text-white text-2xl font-extrabold bg-orange-500 rounded-lg'} href={'/proizvoditel/tabbert'}>
                    Tabbert
                </Link>
                <Link className={'w-full text-center leading-[70px] text-white text-2xl font-extrabold bg-orange-500 rounded-lg'} href={'/proizvoditel/weinsberg'}>
                    Weinsberg
                </Link>
            </div>
        </section>
    );
};

export default Proiz;