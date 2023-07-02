import React, { useEffect, useState } from 'react';
import { EFilters } from '@/components/Filter/EFilters';

const ParamsFilter = ({doma, setFilteredDoma}) => {



    const [inputSearch, setInputSearch] = useState('')
    const [inputVin, setInputVin] = useState('')
    const [filters, setFilters] = useState<EFilters[]>([])
    const handleFilter = (clickedFilter: EFilters) => {
        let temp = [...filters]

        if(!filters.includes(clickedFilter)) temp = [...temp, clickedFilter] //add new
        else {temp = temp.filter(el => el !== clickedFilter) } // del cur

        if(EFilters.cheap === clickedFilter) { // del opposite
            temp = temp.filter(el => el !== EFilters.expensive)
        }
        else if(EFilters.expensive === clickedFilter) { // del opposite
            temp = temp.filter(el => el !== EFilters.cheap)
        }
        else if(EFilters.long === clickedFilter) { // del opposite
            temp = temp.filter(el => el !== EFilters.short)
        }
        else if(EFilters.short === clickedFilter) { // del opposite
            temp = temp.filter(el => el !== EFilters.long)
        }
        else if(EFilters.heavy === clickedFilter) { // del opposite
            temp = temp.filter(el => el !== EFilters.light)
        }
        else if(EFilters.light === clickedFilter) { // del opposite
            temp = temp.filter(el => el !== EFilters.heavy)
        }

        setFilters(temp)
    }

    const handleClear = () => {
        setInputSearch('')
        setInputVin('')
        setFilters([])
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
            filtered.sort((a, b) => {

                let shouldChange = false
                let checkCount = 0;
                let changeCount = 0;

                for(let i = 0; i < filters.length; i++) {
                    const curFil = filters[i]
                    if([EFilters.cheap, EFilters.expensive].includes(curFil)) {
                        checkCount++
                        const priceA = !!a.prices_sale ? a.prices_sale : a.price
                        const priceB = !!b.prices_sale ? b.prices_sale : b.price
                        if (priceA > priceB && curFil === EFilters.cheap)  {
                            shouldChange = true
                            changeCount++
                        } else if (priceA < priceB  && curFil === EFilters.expensive)  {
                            shouldChange = true
                            changeCount++
                        }
                    }
                    if([EFilters.light, EFilters.heavy].includes(curFil)) {
                        checkCount++
                        if (a.mass > b.mass && curFil === EFilters.light)  {
                            shouldChange = true
                            changeCount++
                        }
                        else if (a.mass < b.mass && curFil === EFilters.heavy)  {
                            shouldChange = true
                            changeCount++
                        }
                    }
                    if([EFilters.short, EFilters.long].includes(curFil)) {
                        checkCount++
                        if (a.dlina > b.dlina && curFil === EFilters.short)  {
                            shouldChange = true
                            changeCount++
                        }
                        else if (a.dlina < b.dlina && curFil === EFilters.long)  {
                            shouldChange = true
                            changeCount++
                        }

                    }
                }
                return checkCount === changeCount && shouldChange ? 1 : -1
            })

            return filtered
        })

    }, [inputSearch, inputVin, filters])




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
                        style={{background: filters.includes(EFilters.cheap) ? 'green' : 'white'}}
                    >
                        Сначала дешёвые
                    </button>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1'}
                        onClick={(e) => handleFilter(EFilters.expensive)}
                        style={{background: filters.includes(EFilters.expensive) ? 'green' : 'white'}}
                    >
                        Сначала дорогие
                    </button>

                </div>
                <div>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1 mb-1'}
                        onClick={(e) => handleFilter(EFilters.light)}
                        style={{background: filters.includes(EFilters.light) ? 'green' : 'white'}}
                    >
                        Сначала лёгкие
                    </button>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1 '}
                        onClick={(e) => handleFilter(EFilters.heavy)}
                        style={{background: filters.includes(EFilters.heavy) ? 'green' : 'white'}}
                    >
                        Сначала тяжёлые
                    </button>

                </div>
                <div>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1 mb-1'}
                        onClick={(e) => handleFilter(EFilters.short)}
                        style={{background: filters.includes(EFilters.short) ? 'green' : 'white'}}
                    >
                        Сначала короткие
                    </button>
                    <button
                        className={'block w-full text-black bg-amber-50 p-1'}
                        onClick={(e) => handleFilter(EFilters.long)}
                        style={{background: filters.includes(EFilters.long) ? 'green' : 'white'}}
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

/*
    useEffect(() => {
        let filtered = [...doma]; // т.к. пропсы нельзя изменять!!! было - = doma

        if (inputSearch) {
            // @ts-ignore
            filtered = filtered.filter((u) =>
                u.title.toLowerCase().includes(inputSearch.toLowerCase())
            )
        }

        if (inputVin) {
            // @ts-ignore
            filtered = filtered.filter((u) =>
                u.vin.toLowerCase().includes(inputVin.toLowerCase())
            )
        }


        if (sortNew) {
            filtered.sort((a, b) => {
                return sortNew === 'Новые' ?
                    (!!b.god_vipuska ? b.god_vipuska : b.price) - (a.god_vipuska ? a.god_vipuska : a.price)
                    : (!!a.god_vipuska ? a.god_vipuska : a.price) - (b.god_vipuska ? b.god_vipuska : b.price)
            })
        }

        if (sortPrice) {
            filtered.sort((a, b) => {
                return sortPrice === 'Дорогие' ?
                    (!!b.prices_sale ? b.prices_sale : b.price) - (a.prices_sale ? a.prices_sale : a.price)
                    : (!!a.prices_sale ? a.prices_sale : a.price) - (b.prices_sale ? b.prices_sale : b.price)
            })
        }

        if (sortMass) {
            filtered.sort((a, b) => {
                return sortMass === 'Тяжелые' ?
                    (!!b.mass ? b.mass : b.mass) - (a.mass ? a.mass : a.mass)
                    : (!!a.mass ? a.mass : a.mass) - (b.mass ? b.mass : b.mass)
            })
        }



        if (sortDlinna) {

        }

        if (curMesta) {

        }

        setFilteredDoma(filtered)

    }, [inputSearch, inputVin, curMesta, sortMass, sortDlinna, sortPrice, sortNew])

 */