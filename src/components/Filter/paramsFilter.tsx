import React, { useEffect, useState } from 'react';
import { EFilters } from '@/components/Filter/EFilters';

// @ts-ignore
const ParamsFilter = ({doma, setFilteredDoma}) => {
    const [inputSearch, setInputSearch] = useState('')
    const [inputVin, setInputVin] = useState('')
    const [filter, setFilter] = useState<EFilters | null>(null)
    const handleFilter = (clickedFilter: EFilters) => {
        setFilter(clickedFilter)
    }

    const handleClear = () => {
        setInputSearch('')
        setInputVin('')
        setFilter(null)
    }

    useEffect(() => {
        setFilteredDoma(() => {
            const old = [...doma]
            const filtered = old.filter(el => {
                if(inputSearch && inputVin) {
                    return el.title.toLowerCase().includes(inputSearch.toLowerCase())
                        && el.vin.toLowerCase().includes(inputVin.toLowerCase())
                } else if(inputSearch) {
                    return el.title.toLowerCase().includes(inputSearch.toLowerCase())
                } else if(inputVin) {
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
                        if (filter === EFilters.cheap)  {
                            return +priceA - +priceB
                        } else if (filter === EFilters.expensive)  {
                            return +priceB - +priceA
                        }

                        if (filter === EFilters.light)  {
                            return +a.mass - +b.mass
                        }
                        else if (filter === EFilters.heavy)  {
                            return +b.mass - +a.mass
                        }

                        if (filter === EFilters.short)  {
                            return +a.dlina - +b.dlina
                        }
                        else if (filter === EFilters.long)  {
                            return +b.dlina - +a.dlina
                        }
            })

            return filtered
        })

    }, [inputSearch, inputVin, filter])




    return (
        <section className={'filter container px-6 py-6 mx-auto bg-blue-700 rounded-lg shadow-2xl my-[35px]'}>
            <div className="block-filter flex w-full justify-between">
                <div className="search">
                    <input value={inputSearch} onChange={(e) => setInputSearch(e.target.value)}
                           placeholder="Поиск по названию"/>
                </div>
                <div className="vin">
                    <input value={inputVin} onChange={(e) => setInputVin(e.target.value)}
                           placeholder="Поиск по №"/>
                </div>
            </div>
            <p className={'block w-full text-white'}>Сортировать по:</p>
            <div className="block-filter">
                <div className="price">
                    {/*// @ts-ignore*/}
                    <button
                        className={'block w-full text-black bg-amber-50 p-1 mb-1'}
                        onClick={(e) => handleFilter(EFilters.cheap)}
                        style={{background: filter === EFilters.cheap ? 'green' : 'white'}}
                    >
                        Сначала дешёвые
                    </button>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1'}
                        onClick={(e) => handleFilter(EFilters.expensive)}
                        style={{background: filter === EFilters.expensive ? 'green' : 'white'}}
                    >
                        Сначала дорогие
                    </button>

                </div>
                <div>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1 mb-1'}
                        onClick={(e) => handleFilter(EFilters.light)}
                        style={{background: filter === EFilters.light ? 'green' : 'white'}}
                    >
                        Сначала лёгкие
                    </button>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1 '}
                        onClick={(e) => handleFilter(EFilters.heavy)}
                        style={{background: filter === EFilters.heavy ? 'green' : 'white'}}
                    >
                        Сначала тяжёлые
                    </button>

                </div>
                <div>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1 mb-1'}
                        onClick={(e) => handleFilter(EFilters.short)}
                        style={{background: filter === EFilters.short ? 'green' : 'white'}}
                    >
                        Сначала короткие
                    </button>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1'}
                        onClick={(e) => handleFilter(EFilters.long)}
                        style={{background: filter === EFilters.long ? 'green' : 'white'}}
                    >
                        Сначала длинные
                    </button>
                </div>
            </div>
            <div>
                <button
                    className={'block w-full text-black bg-amber-50 p-1'}
                    onClick={() => handleClear()}
                >
                    Сбросить фильтры
                </button>
            </div>
        </section>
    );
};

export default ParamsFilter;