import React, { useState } from 'react';
import Image from 'next/image'
import Modal from '@/components/Modal/Modal';
import CaravanSelectionForm from '@/components/Modal/CaravanSelectionForm';

const CapHome = () => {
    const god = new Date().getFullYear()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    
    return (
        <>
            <section style={{
                backgroundImage: 'url(fonhome.jpg)'
            }} className={'max-h-[800px] h-[90vh] block m-0 w-full max-w-full sm:bg-fixed bg-center bg-no-repeat bg-cover'}>
                <div className={'w-full h-full bg-black/50 flex flex-col justify-center'}>
                    <div className={'container mx-auto px-6'}>
                        <h1 className={'text-white font-bold uppercase text-3xl sm:text-6xl mb-3'}>Самый большой <br/>парк
                            караванов</h1>
                        <p className={'text-gray-300 text-md sm:text-lg'}>Продажа караванов, домов на колесах,<br/> кемперов, автодомов от
                            от 2000 до {god} года выпуска</p>
                        <button 
                            onClick={() => setModalIsOpen(true)}
                            className={'bg-amber-500 text-white px-6 py-3 text-xl font-bold rounded-lg border-[1px] border-white hover:bg-amber-600 transition'}
                        >
                            Подобрать караван
                        </button>
                    </div>
                </div>
            </section>
            
            {/* @ts-ignore */}
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                {/* @ts-ignore */}
                <CaravanSelectionForm onClose={() => setModalIsOpen(false)} />
            </Modal>
        </>
    );
};

export default CapHome;