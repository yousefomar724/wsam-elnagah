import styles from './index.module.css'
import Link from 'next/link'
import Layout from '../../components/layout'
import Image from 'next/image'
import Head from 'next/head'
import FullPageSlider from '../../components/fullPageSlider'
import { useEffect, useState } from 'react'

// export const getStaticProps = async () => {
//   try {
//     const [countriesRes, slidesRes] = await Promise.all([
//       fetch('https://elnagahtravels.com/backend/public/api/countries'),
//       fetch(
//         'https://elnagahtravels.com/backend/public/api/slides?page=programs'
//       ),
//     ])
//     const [
//       { countries = [] },
//       {
//         data: { slide = [] },
//       },
//     ] = await Promise.all([countriesRes.json(), slidesRes.json()])
//     return {
//       props: {
//         countries,
//         slide,
//       },
//       revalidate: 10,
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

const OurPrograms = () => {
  const [slides, setSlides] = useState([])
  const [countries, setCountries] = useState([])
  const fetchData = async () => {
    try {
      const [countryRes, slidesRes] = await Promise.all([
        fetch(
          'https://elnagahtravels.com/backend/public/api/countries?country_for=programs'
        ),
        fetch(
          'https://elnagahtravels.com/backend/public/api/slides?page=programs'
        ),
      ])
      const [
        { countries = [] },
        {
          data: { slide = [] },
        },
      ] = await Promise.all([countryRes.json(), slidesRes.json()])
      setSlides(slide)
      setCountries(countries)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Layout>
      <Head>
        <title>البرامج السياحية</title>
      </Head>
      <FullPageSlider
        data={slides}
        title={slides[0]?.title}
        btnText={slides[0]?.button_text}
        btnUrl={'#content'}
      />
      <div className={styles.programs__content} id='content'>
        <h2 className='main__title'>البرامج السياحية</h2>
        <div className={styles.programs__grid}>
          {countries &&
            countries?.reverse().map((country) => (
              <Link href={`/our-programs/${country?.id}`} key={country?.id}>
                <div className={styles.programs__card}>
                  <Image
                    layout='fill'
                    src={country?.image}
                    alt={country?.name}
                    className={styles.programs__card__img}
                  />
                  <h3>{country?.name}</h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default OurPrograms
