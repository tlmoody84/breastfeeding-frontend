// pages/_app.tsx
import '../styles/global.css';
import Navigation from '../components/Navigation';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Navigation />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
