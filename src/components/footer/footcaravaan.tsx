import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {FaFilter, FaHeart} from "react-icons/fa";
import {AddWish} from "@/store/slice/wishlist";
import {AddComp} from "@/store/slice/compare";
import {useAppDispatch, useAppSelector} from "@/store/store";
import Modal from '@/components/Modal/Modal';
import SimpleApplicationForm from '@/components/Modal/SimpleApplicationForm';

//@ts-ignore
const Footcaravaan = ({title, price, img, slug, openModal}) => {
    // @ts-ignore
    const {wishList} = useAppSelector(state => state.wishlist)
    // @ts-ignore
    const {compareList} = useAppSelector(state => state.compare)

    const dispatch = useAppDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    //@ts-ignore
    const sendToCart = (slug, title, price, img) => {
        //@ts-ignore
        dispatch(AddWish({slug, title, price, img}))
        //@ts-ignore
        // refCount.current.value = 1
        // setShowToast((currVal) => !currVal)
        // setTimeout(() => setShowToast(false), 3000)
    }
    //@ts-ignore
    const sendToComp = (slug, title, price, img) => {
        //@ts-ignore
        dispatch(AddComp({slug, title, price, img}))
        //@ts-ignore
        // refCount.current.value = 1
        // setShowToast((currVal) => !currVal)
        // setTimeout(() => setShowToast(false), 3000)
    }
    const [disableComp, setDisableComp] = useState(false)
    useEffect(() => {
        // let disableList
        //@ts-ignore
        const FindComp = compareList.findIndex(list => list.slug === slug)
        // @ts-ignore
        // setDisable(FindWish)
        if (FindComp === -1) {
            setDisableComp(false)
        } else {
            setDisableComp(true)
        }
    }, [compareList])

    const [disableList, setDisableList] = useState(false)
    useEffect(() => {
        // let disableList
        //@ts-ignore
        const FindWish = wishList.findIndex(list => list.slug === slug)
        // @ts-ignore
        // setDisable(FindWish)
        if (FindWish === -1) {
            setDisableList(false)
        } else {
            setDisableList(true)
        }
    }, [wishList])
    return (
        <div
            className={'gap-3 z-10 fixed bottom-0 w-full bg-[#0F0F1B] text-white flex flex-row justify-between items-center px-4 py-2'}>
            <div>
                <Image src={img} alt={title} width={70} height={60} className={'rounded-lg'}/>
            </div>
            <div className={'text-xl'}>
                <h3>{title}</h3>
            </div>
            <div className={'text-2xl font-bold'}>
                {price} ₽
            </div>
            <div className={'grid grid-cols-2 gap-2 py-2'}>
                <button disabled={disableComp} onClick={() => sendToComp(slug, title, price, img)}
                        className={'w-[35px] flex flex-row border-blue-600 border-2 py-2 rounded items-center justify-center gap-2 disabled:bg-blue-200 disabled:text-white disabled:border-blue-200 disabled:cursor-no-drop'}>
                    <FaFilter className={'text-blue-600'}/></button>
                <button disabled={disableList}
                        onClick={() => sendToCart(slug, title, price, img)}
                        className={'w-[35px] flex flex-row border-red-700 border-2 py-2 rounded items-center justify-center gap-2 disabled:bg-red-200 disabled:text-white disabled:border-red-200 disabled:cursor-no-drop'}>
                    <FaHeart className={'text-red-700'}/></button>
            </div>
            <div>
                <button onClick={() => setModalIsOpen(true)} className={'bg-orange-500 px-4 py-2 rounded'}>
                    Оставить заявку
                </button>
            </div>
        </div>
        
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
            <SimpleApplicationForm
                productData={{
                    title: title,
                    price: price,
                    slug: slug
                }}
                onClose={() => setModalIsOpen(false)}
            />
        </Modal>
    );
};

export default Footcaravaan;