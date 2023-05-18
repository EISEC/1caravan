import Menu from "@/components/header/menu";
import CapHome from "@/components/home/capHome";
import {clearComp} from "@/store/slice/compare";
import Footer from "@/components/footer/footer";
import {useAppDispatch, useAppSelector} from "@/store/store";
import React from "react";

const Compare = () => {
    const dispatch = useAppDispatch()
    const {compareList} = useAppSelector(state => state.compare)
    return (
        <>
            <Menu/>
            <main>
                <CapHome/>
                <button onClick={() => dispatch(clearComp())}>
                    Очистить
                </button>
                <ul>
                    {/*//@ts-ignore*/}
                    {compareList.map(el => {
                        return(
                            <li key={el.slug}>
                                {el.title}
                            </li>
                        )
                    })}
                </ul>
            </main>
            <Footer/>
        </>
    );
};

export default Compare;