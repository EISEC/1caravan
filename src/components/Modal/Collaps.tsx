import React, {FC, ReactNode} from 'react';
import {IoIosClose} from "react-icons/io";

export type TCollaps = {
    isOpen: boolean
    children: ReactNode | string
    onClose: () => void
}

const Collaps: FC<TCollaps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;
    // @ts-ignore
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div className={'relative px-4 py-6 transition'}>
            {children}
            <button
                className={'w-[200px] mx-auto flex gap-1 items-center justify-center my-[15px] p-4 bg-[#8A8556] text-white rounded-lg transition text-lg hover:text-xl hover:bg-[#515A89]'}
                onClick={onClose}>Закрыть<IoIosClose
                className={'font-bold text-3xl'}/></button>
        </div>
    );
};

export default Collaps;