import React from 'react';
import {useRouter} from 'next/router';
import {ImSpinner10} from "react-icons/im";
import cl from './loaderPage.module.css'
import Image from 'next/image'

const LOADER_THRESHOLD = 250;

// @ts-ignore
export default function NavigationLoader(props) {

    const {text = "Loading..."} = props;
    const [isLoading, setLoading] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {

        // @ts-ignore
        let timer;

        const start = () => timer = setTimeout(() => setLoading(true), LOADER_THRESHOLD);

        const end = () => {
            // @ts-ignore
            if (timer) {
                clearTimeout(timer);
            }
            setLoading(false);
        };

        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);

        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end);

            // @ts-ignore
            if (timer) {
                clearTimeout(timer.current);
            }
        };

    }, [router.events]);

    if (!isLoading) return null;

    return (
        <div
            className={'fixed top-0 left-0 h-[100vh] w-[100vw] bg-stone-50/75 z-40 flex items-center justify-center'}>
            <ImSpinner10 className={'text-6xl animate-spin transition text-amber-600'}/>
        </div>
    );
}