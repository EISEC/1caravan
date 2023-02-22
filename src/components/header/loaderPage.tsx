import React from 'react';
import {useRouter} from 'next/router';
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
        <div className={cl.navigationLoader}>
            <Image src='/loader.gif' alt={'Загрузка'} width={128} height={128}/>
        </div>
    );
}