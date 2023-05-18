import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getLocalStore} from 'next-persist'


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

const persistedState = getLocalStore('wishlist', initialState );

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: persistedState,
    reducers: {
        AddWish: (state = initialState, action: PayloadAction<WishItem>) => {
            //@ts-ignore
            let idx = state.wishList.findIndex(el => el.slug === action.payload.slug)
            if(idx === -1){
                state.wishList.push(action.payload)
            } if(idx > 0) {

            } else {

            }
        },
        clearWish: (state = initialState) => {
            state.wishList = []
        },
    },
})

export const {AddWish, clearWish} = wishlistSlice.actions

export default wishlistSlice.reducer