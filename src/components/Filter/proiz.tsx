import React, {useState} from 'react';
import Link from "next/link";

// @ts-ignore
export default function Proiz({data}) {
    const [open, setOpen] = useState(false)

    const toggle = () => {
        open ? setOpen(false) : setOpen(true)
    }
    console.log(open)

    return (
        <section className={'container mx-auto my-3 mt-[35px] px-4'}>
            <div className={`grid grid-cols-2 transition gap-2 md:grid-cols-4 justify-between overflow-hidden ${!open ? 'max-h-40' : ''}`}>
                {/*// @ts-ignore*/}
                {data?.map(e => {
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
                })}
            </div>
            <button className={'bg-gray-400 mt-3 px-4 py-2 rounded-md'} onClick={toggle}>
                {!open ? 'Показать все' : 'Скрыть'}
            </button>
        </section>
    );
};

// export async function getStaticProps() {
//     const {data: data} = await axios.get('https://1caravan.ru/wp-json/api/v2/doma/proizvoditeli')
//     console.log(data)
//     return {
//         props: {data}, // will be passed to the page component as props
//     }
// }