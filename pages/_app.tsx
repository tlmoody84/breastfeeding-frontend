// pages/_app.tsx
import '../styles/global.css';
import Navigation from '../components/Navigation';
import type { AppProps } from 'next/app';
import '../styles/notes.css';
import '../styles/users.css';
import '../styles/feeds.css';
import React from 'react';




const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Navigation />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;