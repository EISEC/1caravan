import React, {useMemo, useState} from 'react';
import Link from "next/link";
import axios from "axios";

// @ts-ignore
export default function Proiz() {
    const [open, setOpen] = useState(true)
    const [unic, setUnic] = useState()
    // @ts-ignore
    const proizvod = useMemo(async () => {
        const {data: data} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/proizvoditeli')
        //@ts-ignore
        setUnic(data)
    }, [])

    return (
        <section className={'container mx-auto my-3 mt-[35px] px-4'}>
            <h2 className={'my-0 mb-4 text-3xl font-bold'}>Производители</h2>
            <div
                className={`grid grid-cols-2 transition gap-2 md:grid-cols-4 justify-between overflow-hidden ${!open ? 'max-h-40' : ''}`}>
                {/*// @ts-ignore*/}
                {unic?.map(e => {
                    if (e.visible) {
                        return (
                            <Link
                                key={e.slug}
                                className={'w-full text-center md:leading-[70px] text-white md:text-2xl font-extrabold bg-[#0f0f1b] rounded-lg'}
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
                })}
            </div>
        </section>
    );
};