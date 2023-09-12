import React, { FC, ReactNode, useState } from "react";
import cl from './Modal.module.css'
import { IoIosClose } from "react-icons/io";

export type TModal = {
    isOpen: boolean
    children: ReactNode | string
    onClose: () => void
}

const Modal: FC<TModal> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    // @ts-ignore
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={`${cl.modalOverlay} overflow-scroll md:overflow-auto md:items-center`} onClick={handleOverlayClick}>
            <div className={`${cl.modalContent} h-fit relative`}>
                {children}
                <button className={'absolute top-4 right-4 text-4xl'} onClick={onClose}><IoIosClose className={'text-red-700 font-bold'}/></button>
            </div>
        </div>
    );
};

export default Modal;
