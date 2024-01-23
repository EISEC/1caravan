import React from 'react';

const Otzivishki = () => {

    return (
        <div className={'container mx-auto px-6 grid grid-cols-2 items-center gap-20'}>
            {/*// @ts-ignore*/}
            <div className={'piasd w-1/2'}>
                {/*// @ts-ignore*/}
                <iframe className={'piframe'}
                        src="https://yandex.ru/maps-reviews-widget/187769733343?comments"></iframe>
                <a className={'piotzovi'} href="https://yandex.ru/maps/org/pervy_caravan/187769733343/"
                    // @ts-ignore
                >Первый Caravan на карте Санкт‑Петербурга и Ленинградской области — Яндекс Карты</a>
            </div>
            <div className={'flex flex-col gap-10 items-center justify-center'}>
                <iframe
                    width={'100%'}
                    height={'400px'}
                    src={'https://m.avito.ru/brands/1caravan/all/gruzoviki_i_spetstehnika?sellerId=0c3cb44715b93b50eeb6443933ebb961&localPriority=0#open-reviews-list'}></iframe>
                <button
                    className={'bg-blue-500 p-2 text-white rounded-md px-4 shadow-2xl hover:bg-blue-700 transition-all'}>
                    Смотреть отзывы на авито
                </button>
            </div>
        </div>
    );
};

export default Otzivishki;