import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getLocalStore} from 'next-persist'


export type CompItem = {
    slug: string,
    img: string,
    price: any,
    title: string,
}

export type compListT = {
    compareList: CompItem[],
}

const initialState: compListT = {
    compareList: [],
}

export const compareSlice = createSlice({
    name: 'compare',
    initialState: initialState,
    reducers: {
        AddComp: (state = initialState, action: PayloadAction<CompItem>) => {
            //@ts-ignore
            let idx = state.compareList.findIndex(el => el.slug === action.payload.slug)
            if(idx === -1){
                state.compareList.push(action.payload)
            } if(idx > 0) {

            } else {

            }
        },
        clearComp: (state = initialState) => {
            state.compareList = []
        },
    },
})

export const {AddComp, clearComp} = compareSlice.actions

export default compareSlice.reducer