import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <Script id="google-analytics" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-SKQVC2JL0B`}>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-SKQVC2JL0B', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
1;
