import Head from 'next/head';
import { useEffect } from 'react';

import 'tailwindcss/tailwind.css';
import Store from '../store';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        ></meta>
        <script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
