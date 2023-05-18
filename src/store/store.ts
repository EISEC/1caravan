import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import wishlistSlice from './slice/wishlist'
import compareSlice from './slice/compare'


const persistWhilist = {
    key: 'wishlist',
    storage,
}

const persistCompare = {
    key: 'compare',
    storage,
}

const persistedWish = persistReducer(persistWhilist, wishlistSlice);
const persistedComp = persistReducer(persistCompare, compareSlice);

const rootReducer = combineReducers({
    wishlist: persistedWish,
    compare: persistedComp,
});


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER],
            },
        }),
})

export const persistor = persistStore(store);
export default store

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector