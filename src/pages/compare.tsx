import Menu from "@/components/header/menu";
import CapHome from "@/components/home/capHome";
import {clearComp} from "@/store/slice/compare";
import Footer from "@/components/footer/footer";
import {useAppDispatch, useAppSelector} from "@/store/store";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {FreeMode, Pagination} from "swiper";
import CopmareCards from "@/components/Cards/CopmareCards";

const Compare = () => {
    const dispatch = useAppDispatch()
    const {compareList} = useAppSelector(state => state.compare)
    const [caravans, setCaravans] = useState([])

    function loadingData(i: any) {
        if (i === 0) {
            return 'Нет добавленых караванов'
        }
        if (i < 0) {
            return 'Ошибка формирования'
        }
        if (i > 0) {
            return 'Загружаем'
        }
    }

    useEffect(() => {
        // @ts-ignore
        compareList.forEach(async (item) => {
            // @ts-ignore
            const caravan = await axios.get(`https://1caravan.ru/wp-json/api/v2/doma/${item.slug}`)
            // @ts-ignore
            setCaravans(current => [...current, caravan.data[0]])
        })
    }, [])

    useEffect(() => {
        if (compareList.length === 0) setCaravans([])
    }, [compareList])
    console.log(caravans)
    return (
        <>
            <Menu/>
            <main>
                <CapHome/>
                <div className="container mx-auto py-5 px-2">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {/*//@ts-ignore*/}
                        {!caravans.length ? loadingData(compareList.length) : caravans.map((el, idx) => {
                            return (
                                // @ts-ignore
                                <SwiperSlide className={''} key={el.id}>
                                    <CopmareCards el={el}/>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    {/*//@ts-ignore*/}
                    {compareList.length === 0 ? '' : <button onClick={() => dispatch(clearComp())}
                                                      className="text-white bg-red-700 px-5 py-2 rounded shadow-xl my-4">
                        Очистить
                    </button>
                    }
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Compare;