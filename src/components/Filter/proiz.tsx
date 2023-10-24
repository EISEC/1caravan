import React, {useMemo, useState} from 'react';
import Link from "next/link";
import axios from "axios";

// @ts-ignore
export default function Proiz({data}) {
    const [open, setOpen] = useState(false)
    const [unic, setUnic] = useState()
    // @ts-ignore
    const proizvod = useMemo(async () => {
        const proizvodData = []
        const {data: data} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/vse')
        for (const dataKey in data) {
            // @ts-ignore
            proizvodData.push(data[dataKey].proizvoditel[0])
        }
        const unicumSet = new Set(proizvodData)
        //@ts-ignore
        setUnic([...unicumSet])
    }, [])
    const toggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <section className={'container mx-auto my-3 mt-[35px] px-4'}>
            <h2 className={'my-0 mb-4 text-3xl font-bold'}>Производители</h2>
            <div
                className={`grid grid-cols-2 transition gap-2 md:grid-cols-4 justify-between overflow-hidden ${!open ? 'max-h-40' : ''}`}>
                {/*// @ts-ignore*/}
                {data?.map(e => {
                    //@ts-ignore
                    for (const i in unic) {
                        if (unic[i] === e.title) {
                            return (
                                <Link
                                    key={e.slug}
                                    className={'w-full text-center md:leading-[70px] text-white md:text-2xl font-extrabold bg-[#4B548D] rounded-lg'}
                                    href={{
                                        pathname: "/proizvoditel/[...slug]",
                                        query: {
                                            slug: e.slug,
                                        },
                                    }}>
                                    {e.title}
                                </Link>
                            )
                        }
                    }
                })}
            </div>
            <button className={'bg-gray-400 mt-3 px-4 py-2 rounded-md'} onClick={toggle}>
                {!open ? 'Показать все' : 'Скрыть'}
            </button>
        </section>
    );
};