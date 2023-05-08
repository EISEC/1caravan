import React, {useEffect} from 'react';

const SectionQuiz = () => {
    useEffect(() => {
        (function() { console.log('rendered')}
        )();
        (function (w, d, s, o) {
            var j = d.createElement(s);
            //@ts-ignore
            j.async = true;
            //@ts-ignore
            j.src = '//script.marquiz.ru/v2.js';
            j.onload = function () {
                //@ts-ignore
                if (document.readyState !== 'loading') Marquiz.init(o);
                else document.addEventListener("DOMContentLoaded", function () {
                    //@ts-ignore
                    Marquiz.init(o);
                });
            };
            d.head.insertBefore(j, d.head.firstElementChild);
        })(window, document, 'script', {
                host: '//quiz.marquiz.ru',
                region: 'eu',
                id: '617169426d08b20044f239b3',
                autoOpen: 0,
                autoOpenFreq: false,
                openOnExit: false,
                disableOnMobile: false
            }
        );

        (function (t,
                   p) {//@ts-ignore
            window.Marquiz ? Marquiz.add([t, p]) : document.addEventListener('marquizLoaded', function () {
                //@ts-ignore
                Marquiz.add([t, p])
            })
        })('Inline', {
            id: '617169426d08b20044f239b3',
            buttonText: 'Пройти тест',
            bgColor: '#f78e69',
            textColor: '#ffffff',
            rounded: true,
            shadow: 'rgba(247, 142, 105, 0.5)',
            blicked: true,
            buttonOnMobile: true
        })
    }, [])



    return (
        <section className={'container mx-auto'}>
            <div data-marquiz-id="617169426d08b20044f239b3"></div>
        </section>
    );
};

export default React.memo(SectionQuiz);