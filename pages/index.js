import Hero from '../components/hero'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../components/layout'))
const About = dynamic(() => import('../components/about'))
const Tripes = dynamic(() => import('../components/tripes'))
const Events = dynamic(() => import('../components/events'))
const Success = dynamic(() => import('../components/success'))
const NewPrograms = dynamic(() => import('../components/newPrograms'))
const Special = dynamic(() => import('../components/special'))
const Programs = dynamic(() => import('../components/programs'))

export const getStaticProps = async () => {
  try {
    const [mainRes, programsRes, settingsRes] = await Promise.all([
      fetch('https://elnagahtravels.com/backend/public/api/index'),
      fetch(
        'https://elnagahtravels.com/backend/public/api/countries?country_for=programs'
      ),
      fetch('https://elnagahtravels.com/backend/public/api/settings'),
    ])
    const [
      data = {},
      { countries: programsCountries = [] },
      { settings = {} },
    ] = await Promise.all([
      mainRes.json(),
      programsRes.json(),
      settingsRes.json(),
    ])
    return {
      props: { data, programsCountries, settings },
      revalidate: 60,
    }
  } catch (error) {
    console.log(error)
  }
}

const Home = ({ data, programsCountries, settings }) => {
  const {
    features = [],
    about_wsam_elngah = [],
    latest_programs = [],
    event = {},
    special_offers = [],
    features_slides = [],
    latest_discounts = [],
    slides = [],
  } = data

  return (
    <>
      <Head>
        <title>{settings?.meta_title}</title>
        <meta name='description' content={settings?.description} />
        <meta name='keywords' content={settings?.keywords} />
      </Head>
      <Layout>
        <Hero data={slides} />
        <Programs data={latest_discounts} settings={settings} />
        <Success data={features} features_slides={features_slides} />
        <Tripes data={programsCountries} settings={settings} />
        <About data={about_wsam_elngah} />
        <Special data={special_offers} settings={settings} />
        <div className='spikes'></div>
        <Events event={event} />
        <NewPrograms programs={latest_programs} settings={settings} />
      </Layout>
    </>
  )
}

export default Home