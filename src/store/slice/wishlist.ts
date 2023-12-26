import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type WishItem = {
    slug: string,
    img: string,
    price: any,
    title: string,
}

export type wishListT = {
    wishList: WishItem[],
}

const initialState: wishListT = {
    wishList: [],
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: initialState,
    reducers: {
        AddWish: (state = initialState, action: PayloadAction<WishItem>) => {
            //@ts-ignore
            let idx = state.wishList.findIndex(el => el.slug === action.payload.slug)
            if (idx === -1) {
                state.wishList.push(action.payload)
            }
            if (idx > 0) {

            } else {

            }
        },
        clearWish: (state = initialState) => {
            state.wishList = []
        },
        delWish: (state = initialState, action: PayloadAction<WishItem>) => {
            //@ts-ignore
            let idx = state.wishList.findIndex(el => el.slug === action.payload.slug)
            // @ts-ignore
            idx === 0 ? state.wishList.pop(action.payload) : ''
        },
    },
})

export const {AddWish, clearWish, delWish} = wishlistSlice.actions

export default wishlistSlice.reducer