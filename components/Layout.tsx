import Head from 'next/head';
import { FC } from 'react';
import Nav from './Nav';

interface Props{
    children: any
}

const Layout : FC<Props>= ({children}) => {
    return (
        <>
            <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
            <link rel="preload" href="/fonts/SF.OTF" as="font" crossOrigin="" />
            <link rel="preload" href="/fonts/Neutral.otf" as="font" crossOrigin="" />
            </Head>
            <Nav/>
            <div className="layout">
                {children}
            </div>
        </>
    );
}

export default Layout;
