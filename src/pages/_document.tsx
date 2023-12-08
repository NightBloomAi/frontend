import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                ></link>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                ></link>
                <link
                    href="https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap"
                    rel="stylesheet"
                ></link>
                <Script
                    id="google-analytics"
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=G-SKQVC2JL0B`}
                >
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-SKQVC2JL0B', {
                    page_path: window.location.pathname,
                    });
                `}
                </Script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
1;
