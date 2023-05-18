import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import NavigationLoader from "@/components/header/loaderPage";
import {Montserrat} from "@next/font/google";
import PersistWrapper from 'next-persist/lib/NextPersistWrapper';
import {Provider} from "react-redux";
import store from "@/store/store";

const montserrat = Montserrat({subsets: ['cyrillic', 'latin']})

const npConfig = {
    method: 'localStorage',
    allowList: {
        wishlist: [],
        compare: [],
    },
};

export default function App({Component, pageProps}: AppProps) {


    return (
        <>
            <Provider store={store}>
                {/*// @ts-ignore*/}
                <PersistWrapper wrapperConfig={npConfig}>
                    <style jsx global>{`
                      * {
                        font-family: ${montserrat.style.fontFamily};
                      }
                    `}
                    </style>
                    <NavigationLoader/>
                    <Component {...pageProps} />
                </PersistWrapper>
            </Provider>
        </>
    )
}
