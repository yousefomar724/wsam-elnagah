import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import Favicon from '../components/favicon'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <Favicon />
      </Head>
      <NextNProgress color='#07162d' />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
