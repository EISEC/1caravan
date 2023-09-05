import React, {useEffect, useState} from 'react';
import {EFilters} from '@/components/Filter/EFilters';

// @ts-ignore
const ParamsFilter = ({doma, setFilteredDoma, nameCurPage}) => {
    const [inputSearch, setInputSearch] = useState('')
    const [inputVin, setInputVin] = useState('')
    // @ts-ignore
    // Access localStorage
    const [filter, setFilter] = useState<EFilters | null>(typeof window !== "undefined" ? sessionStorage.getItem(`${nameCurPage}_filter`) : null)
    const handleFilter = (clickedFilter: EFilters) => {
        setFilter(clickedFilter)
        sessionStorage.setItem(`${nameCurPage}_filter`, clickedFilter);
    }

    const handleClear = () => {
        setInputSearch('')
        setInputVin('')
        setFilter(null)
        sessionStorage.removeItem(`${nameCurPage}_filter`);
    }

    useEffect(() => {
        setFilteredDoma(() => {
            const old = [...doma]
            const filtered = old.filter(el => {
                if (inputSearch && inputVin) {
                    return el.title.toLowerCase().includes(inputSearch.toLowerCase())
                        && el.vin.toLowerCase().includes(inputVin.toLowerCase())
                } else if (inputSearch) {
                    return el.title.toLowerCase().includes(inputSearch.toLowerCase())
                } else if (inputVin) {
                    return el.vin.toLowerCase().includes(inputVin.toLowerCase())
                } else {
                    return old
                }
            })

            //sort
            // @ts-ignore
            filtered.sort((a, b) => {
                const priceA = !!a.prices_sale ? a.prices_sale : a.price
                const priceB = !!b.prices_sale ? b.prices_sale : b.price
                if (filter === EFilters.cheap) {
                    return +priceA - +priceB
                } else if (filter === EFilters.expensive) {
                    return +priceB - +priceA
                }

                if (filter === EFilters.light) {
                    return +a.mass - +b.mass
                } else if (filter === EFilters.heavy) {
                    return +b.mass - +a.mass
                }

                if (filter === EFilters.short) {
                    return +a.dlina - +b.dlina
                } else if (filter === EFilters.long) {
                    return +b.dlina - +a.dlina
                }
            })

            return filtered
        })

    }, [inputSearch, inputVin, filter])

    const complete = 'bg-[#4B548D] text-white'
    const noSelect = 'bg-white'


    return (
        <section
            className={'filter container mx-auto px-4 py-2'}>
            <div
                className={'bg-[#C2C3C7] px-6 py-6 flex flex-col md:flex-row rounded-lg shadow-2xl mt-[35px] mb-[15px] justify-between gap-4'}>
                <div className="block-filter flex flex-col content-stretch gap-2 w-full">
                    <div className="search h-full">
                        <input className={'w-full min-h-[30px] h-full px-[10px] rounded-md'}
                               value={inputSearch}
                               onChange={(e) => setInputSearch(e.target.value)}
                               placeholder="Поиск по названию"/>
                    </div>
                    <div className="vin h-full">
                        <input className={'w-full min-h-[30px] h-full px-[10px] rounded-md'}
                               value={inputVin}
                               onChange={(e) => setInputVin(e.target.value)}
                               placeholder="Поиск по №"/>
                    </div>
                </div>
                <div className="block-filter flex justify-around gap-4 w-full">
                    <div className="price flex flex-col content-stretch gap-2">
                        {/*// @ts-ignore*/}
                        <button
                            className={`block w-full text-black p-1 mb-1 px-[10px] py-[5px] font-medium rounded-md text-sm md:text-lg md:w-[200px] ${filter === EFilters.cheap ? complete : noSelect}`}
                            onClick={(e) => handleFilter(EFilters.cheap)}
                        >
                            Сначала дешёвые
                        </button>
                        <button
                            className={`block w-full text-black p-1 px-[10px] py-[5px] font-medium rounded-md text-sm md:text-lg md:w-[200px] ${filter === EFilters.expensive ? complete : noSelect}`}
                            onClick={(e) => handleFilter(EFilters.expensive)}
                        >
                            Сначала дорогие
                        </button>

                    </div>
                    <div className={'flex flex-col content-stretch gap-2'}>
                        <button
                            className={`block w-full text-black p-1 mb-1 px-[10px] py-[5px] font-medium rounded-md text-sm md:text-lg md:w-[200px] ${filter === EFilters.light ? complete : noSelect}`}
                            onClick={(e) => handleFilter(EFilters.light)}
                        >
                            Сначала лёгкие
                        </button>
                        <button
                            className={`block w-full text-black p-1 px-[10px] py-[5px] font-medium rounded-md text-sm md:text-lg md:w-[200px] ${filter === EFilters.heavy ? complete : noSelect}`}
                            onClick={(e) => handleFilter(EFilters.heavy)}
                        >
                            Сначала тяжёлые
                        </button>

                    </div>
                    <div className={'flex flex-col content-stretch gap-2'}>
                        <button
                            className={`block w-full text-black p-1 mb-1 px-[10px] py-[5px] font-medium rounded-md text-sm md:text-lg md:w-[200px] ${filter === EFilters.short ? complete : noSelect}`}
                            onClick={(e) => handleFilter(EFilters.short)}
                        >
                            Сначала короткие
                        </button>
                        <button
                            className={`block w-full text-black p-1 px-[10px] py-[5px] font-medium rounded-md text-sm md:text-lg md:w-[200px] ${filter === EFilters.long ? complete : noSelect}`}
                            onClick={(e) => handleFilter(EFilters.long)}
                        >
                            Сначала длинные
                        </button>
                    </div>
                </div>
            </div>
            <div className={'justify-end items-center flex'}>
                <button
                    className={'block w-full md:w-[150px] text-black bg-black text-white rounded-md py-2'}
                    onClick={() => handleClear()}
                >
                    Сброс
                </button>
            </div>
        </section>
    );
};

export default ParamsFilter;