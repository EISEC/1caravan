import React from 'react';
import Image from 'next/image'

const CapHome = () => {
    const god = new Date().getFullYear()
    return (
        <section style={{
            backgroundImage: 'url(fonhome.jpg)'
        }} className={'max-h-[800px] h-[90vh] block m-0 w-full max-w-full sm:bg-fixed bg-center bg-no-repeat bg-cover'}>
            <div className={'w-full h-full bg-black/50 flex flex-col justify-center'}>
                <div className={'container mx-auto px-6'}>
                    <h1 className={'text-white font-bold uppercase text-3xl sm:text-6xl mb-3'}>Самый большой <br/>парк караванов</h1>
                    <p className={'text-gray-300 text-md sm:text-lg'}>Продажа караванов, прицепов домов, <br/> кемперов от 2000 до {god} года выпуска</p>
                    <button className={'bg-orange-600 text-white px-6 py-3 text-xl font-bold rounded-lg'}>
                        Оставить заявку
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CapHome;