import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import NavigationLoader from "@/components/header/loaderPage";
import {Montserrat} from "@next/font/google";
import PersistWrapper from 'next-persist/lib/NextPersistWrapper';
import {Provider} from "react-redux";
import store from "@/store/store";
import {DefaultSeo} from 'next-seo';
import {useRouter} from "next/router";

const montserrat = Montserrat({subsets: ['cyrillic', 'latin']})

const npConfig = {
    method: 'localStorage',
    allowList: {
        wishlist: [],
        compare: [],
    },
};

export default function App({Component, pageProps}: AppProps) {
    const route = useRouter();

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
                    <DefaultSeo
                        titleTemplate='%s | Первый караван'
                        defaultTitle='Первый караван'
                        canonical={`https://1caravan.ru${route.asPath}`}
                        openGraph={{
                            type: 'website',
                            locale: 'ru_RU',
                            url: `https://1caravan.ru${route.asPath}`,
                            siteName: 'Первый караван',
                        }}
                    />
                    <NavigationLoader/>
                    {/* @ts-ignore */}
                    <Component {...pageProps} />
                </PersistWrapper>
            </Provider>
        </>
    )
}
