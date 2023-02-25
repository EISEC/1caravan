import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import NavigationLoader from "@/components/header/loaderPage";
import {Montserrat} from "@next/font/google";

const montserrat = Montserrat({subsets: ['cyrillic']})

export default function App({Component, pageProps}: AppProps) {

    return (
        <>
            <style jsx global>{`
              html {
                font-family: ${montserrat.style.fontFamily};
              }
            `}
            </style>
            <NavigationLoader/>
            <Component {...pageProps} />
        </>
    )
}
