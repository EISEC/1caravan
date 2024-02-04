import React, {memo} from 'react';

//@ts-ignore
const Dopy = ({dopy, compare}) => {
    if (compare) {
        //@ts-ignore
        return dopy ? dopy.map((el, index) => {
            return (
                <td className={'pt-1 leading-1'} key={el.наименование_характеристики}>
                    <b>{index + 1})</b> {el.наименование_характеристики}
                    {el.значение_характеристики ? '- <strong>{el.значение_характеристики}</strong>' : ''}
                </td>
            )
        }) : ''

    } else return (
        <section className={'container mx-auto px-4 py-6'}>
            <h3 className={'font-bold text-xl mb-3'}>Дополнительно</h3>
            <ul className={'pl-2 flex flex-col gap-2'}>
                {/*//@ts-ignore}*/}
                {dopy ? dopy.map(el => {
                    return (
                        <td key={el.наименование_характеристики}>
                            {el.наименование_характеристики}
                            {el.значение_характеристики ? '- <strong>{el.значение_характеристики}</strong>' : ''}
                        </td>
                    )
                }) : ''}
            </ul>
        </section>
    );
};

export default memo(Dopy);