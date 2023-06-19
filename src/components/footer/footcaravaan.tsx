import React from 'react';
import Image from "next/image";

//@ts-ignore
const Footcaravaan = ({title, price, img }) => {
    return (
        <div className={'gap-3 fixed bottom-0 w-full bg-[#0F0F1B] text-white flex flex-row justify-between items-center px-4 py-2'}>
            <div>
                <Image src={img} alt={title} width={70} height={60} className={'rounded-lg'}/>
            </div>
            <div className={'text-xl'}>
                <h3>{title}</h3>
            </div>
            <div className={'text-2xl font-bold'}>
                {price} ₽
            </div>
            <div>
                <button className={'bg-orange-500 px-4 py-2 rounded'}>
                    Оставить заявку
                </button>
            </div>
        </div>
    );
};

export default Footcaravaan;