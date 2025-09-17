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
        AddComp: (state, action: PayloadAction<CompItem>) => {
            const existingItem = state.compareList.find(el => el.slug === action.payload.slug);
            if (!existingItem) {
                state.compareList.push(action.payload);
            }
        },
        clearComp: (state) => {
            state.compareList = [];
        },
        delet: (state, action: PayloadAction<CompItem>) => {
            const idx = state.compareList.findIndex(el => el.slug === action.payload.slug);
            if (idx >= 0) {
                state.compareList.splice(idx, 1);
            }
        }
    },
})

export const {AddComp, clearComp, delet} = compareSlice.actions

export default compareSlice.reducer