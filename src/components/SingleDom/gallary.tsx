import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation, Thumbs} from "swiper";
import Image from "next/image";
import cl from "@/pages/avtodom/slug.module.css";

//@ts-ignore
const Gallary = ({title, glavFoto, thumbsSwiper, setThumbsSwiper, acfGall}) => {
    const [isMobile, setIsMobile] = useState(false)
    // @ts-ignore
    useEffect(() => {
        setIsMobile(window.matchMedia('(max-width: 600px)').matches)
    }, [])
    // @ts-ignore
    return (
        <div className="gallary flex flex-col md:flex-row relative gap-[20px]">
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                //@ts-ignore
                direction={!isMobile ? 'vertical' : 'horizontal'}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper max-h-[400px] h-[10vh] md:h-auto w-[100vw] md:max-h-[500px] md:w-[150px]"
            >
                <SwiperSlide>
                    <Image className={`rounded-lg cursor-pointer ${cl.imgCarusel}`} src={glavFoto}
                           alt={`${title} фотография номер ${glavFoto}`}
                           width={250}
                           height={250}
                           quality={80}
                           loading="lazy"/>
                </SwiperSlide>
                {/*// @ts-ignore*/}
                {acfGall.slice().map(el => {
                    return (
                        <SwiperSlide key={el.id}>
                            <Image className={`rounded-lg cursor-pointer ${cl.imgCarusel}`} src={el.url}
                                   alt={`${title} фотография номер ${el.id}`}
                                   width={250}
                                   height={250}
                                   quality={80}
                                   loading="lazy"/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{swiper: thumbsSwiper}}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 w-[100%] min-h-[36vh] rounded-lg"
            >
                <SwiperSlide>
                    <Image className={`rounded-lg cursor-pointer ${cl.imgCarusel}`} src={glavFoto}
                           alt={`${title} фотография  номер ${glavFoto}`}
                           fill
                           sizes="100vw"
                           quality={80}
                           loading="lazy"/>
                </SwiperSlide>
                {/*// @ts-ignore*/}
                {acfGall.slice().map(el => {
                    return (
                        <SwiperSlide key={el.id}>
                            <Image className={`rounded-lg cursor-pointer ${cl.imgCarusel}`} src={el.url}
                                   alt={`${title} фотография  номер ${el.id}`}
                                   fill/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
};

export default Gallary;