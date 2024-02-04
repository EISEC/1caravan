import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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
            if (idx === -1) {
                state.compareList.push(action.payload)
            }
            if (idx > 0) {

            } else {

            }
        },
        clearComp: (state = initialState) => {
            state.compareList = []
        },
        delet: (state = initialState, action: PayloadAction<CompItem>) => {
            //@ts-ignore
            let idx = state.compareList.findIndex(el => el.slug === action.payload.slug)
            if (idx >= 0) {
                // @ts-ignore
                state.compareList.splice(idx, 1)
            }
        }
    },
})

export const {AddComp, clearComp, delet} = compareSlice.actions

export default compareSlice.reducer