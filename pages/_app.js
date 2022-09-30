import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import Favicon from '../components/favicon'
import Script from 'next/script'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const tagManagerArgs = {
    gtmId: `${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`,
  }

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
    window.dataLayer.push({
      event: 'pageview',
    })
  }, [])
  return (
    <>
      <Script
        id='gtm'
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />

      <Script id='gtm2' strategy='lazyOnload'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <Head>
        <Favicon />
      </Head>
      <NextNProgress color='#07162d' />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
