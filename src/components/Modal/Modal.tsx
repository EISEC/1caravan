import React, { FC, ReactNode, useState } from "react";
import cl from './Modal.module.css'

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
        <div className={cl.modalOverlay} onClick={handleOverlayClick}>
            <div className={cl.modalContent}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
