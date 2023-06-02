import Menu from "@/components/header/menu";
import CapHome from "@/components/home/capHome";
import {clearComp} from "@/store/slice/compare";
import Footer from "@/components/footer/footer";
import {useAppDispatch, useAppSelector} from "@/store/store";
import React, {useEffect, useState} from "react";
import {log} from "util";

const Compare = () => {
    const dispatch = useAppDispatch()
    const {compareList} = useAppSelector(state => state.compare)
    const [caravans, setCaravans] = useState([])

    useEffect(() => {
        // @ts-ignore
        let list =[]
        compareList.forEach(async (item, index) =>  {
            const caravan = await fetch(`https://1caravan.ru/wp-json/api/v2/doma/${item.slug}`)
            const [post] = await caravan.json()
            list.push(post)
        })
        // @ts-ignore
        setCaravans(list)
    },[])
    return (
        <>
            <Menu/>
            <main>
                <CapHome/>
                <div className="container mx-auto py-5 px-2">
                    <ul>
                        {/*//@ts-ignore*/}
                        {caravans.map((el, idx) => {
                            return (
                                // @ts-ignore
                                <li key={el.id}>
                                    {/*// @ts-ignore*/}
                                    {el.title}
                                </li>
                            )
                        })}
                    </ul>
                    <button onClick={() => dispatch(clearComp())} className="text-white bg-blue-700 px-5 py-2 rounded shadow-xl my-4">
                        Очистить
                    </button>
                </div>
                <button onClick={()=> console.log(caravans)}> Cgbcrf</button>
            </main>
            <Footer/>
        </>
    );
};

export default Compare;