import React from 'react';
import { TbStarFilled } from "react-icons/tb";

const Scorepointer = ({score}: any) => {
    let stars =[]
    for (let i = 0; i < score; i++){
        stars.push(<TbStarFilled className={'text-yellow-300'}/>)
    }
        return (
            <div className={'flex flex-row gap-1'}>
                {stars.map((el) => {
                    return el;
                })}
            </div>
        );
};

export default Scorepointer;