import React from 'react';
import Link from "next/link";

const Proiz = () => {
    return (
        <section className={'container mx-auto my-3 mt-[35px] px-4'}>
            <div className="grid grid-cols-2 md:flex gap-2 md:flex-row justify-between">
                <Link
                    className={'w-full text-center md:leading-[70px] text-white md:text-2xl font-extrabold bg-[#4B548D] rounded-lg'}
                    href={'/proizvoditel/fendt'}>
                    Fendt
                </Link>
                <Link
                    className={'w-full text-center md:leading-[70px] text-white md:text-2xl font-extrabold bg-[#4B548D] rounded-lg'}
                    href={'/proizvoditel/hobby'}>
                    Hobby
                </Link>
                <Link
                    className={'w-full text-center md:leading-[70px] text-white md:text-2xl font-extrabold bg-[#4B548D] rounded-lg'}
                    href={'/proizvoditel/knaus'}>
                    Knaus
                </Link>
                <Link
                    className={'w-full text-center md:leading-[70px] text-white md:text-2xl font-extrabold bg-[#4B548D] rounded-lg'}
                    href={'/proizvoditel/tabbert'}>
                    Tabbert
                </Link>
                <Link
                    className={'w-full text-center md:leading-[70px] text-white md:text-2xl font-extrabold bg-[#4B548D] rounded-lg'}
                    href={'/proizvoditel/weinsberg'}>
                    Weinsberg
                </Link>
            </div>
        </section>
    );
};

export default Proiz;