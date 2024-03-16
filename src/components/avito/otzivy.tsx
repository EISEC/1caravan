import React from 'react';
import avito from '@/components/avito/avito.json';
import {Swiper, SwiperSlide} from "swiper/react";
import style from '@/components/avito/avito.module.css'

import 'swiper/css/bundle';
import 'swiper/css/pagination';
import {Pagination} from "swiper";
import {FaRegUserCircle} from "react-icons/fa";
import Scorepointer from "@/components/avito/scorepointer";

const Otzivy = () => {
    const reviews = avito.entries
    const score = reviews.filter(x => x.type === 'score')
    const rating = reviews.filter(x => x.type === 'rating')
    return (
        <>
            <Swiper
                direction={'vertical'}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                modules={[Pagination]}
                className={style.mySwiper}
            >
                {rating.map((el) => {
                    return (
                        <SwiperSlide key={el.value.id}>
                            <div className={'flex flex-col text-left mt-5 gap-1'}>
                                <div className={'flex flex-row gap-2'}>
                                    <FaRegUserCircle className={'text-2xl text-blue-700'}/>
                                    {el.value.title}
                                </div>
                                <span className={'text-sm text-gray-400'}>{el.value.rated}</span>
                                <Scorepointer score={el.value.score}/>
                                <div className={'flex pt-3 text-sm'}><p
                                    className={'bg-gray-600 px-2 py-1 rounded-md text-white'}>{el.value.stageTitle}</p>
                                </div>
                                {/*// @ts-ignore*/}
                                <p className={'text-sm'}>{el.value.textSections[0].text}</p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export default Otzivy;