import styles from './index.module.css'
import Link from 'next/link'
import Layout from '../../components/layout'
import Image from 'next/image'
import Head from 'next/head'
import FullPageSlider from '../../components/fullPageSlider'
import { useEffect, useState } from 'react'

// export const getStaticProps = async () => {
//   const response = await fetch(
//     'https://elnagahtravels.com/backend/public/api/countries'
//   )
//   const slidesResponse = await fetch(
//     'https://elnagahtravels.com/backend/public/api/slides?page=discounts'
//   )
//   const { countries } = await response.json()
//   const {
//     data: { slide },
//   } = await slidesResponse.json()
//   return {
//     props: {
//       countries,
//       slide,
//     },
//     revalidate: 10,
//   }
// }

const Sales = () => {
  const [slides, setSlides] = useState([])
  const [countries, setCountries] = useState([])
  const fetchData = async () => {
    try {
      const [countryRes, slidesRes] = await Promise.all([
        fetch(
          'https://elnagahtravels.com/backend/public/api/countries?country_for=discounts'
        ),
        fetch(
          'https://elnagahtravels.com/backend/public/api/slides?page=discounts'
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
        <title>الخصومات</title>
      </Head>
      <FullPageSlider
        data={slides}
        title={slides[0]?.title}
        btnText={slides[0]?.button_text}
        btnUrl={'#content'}
      />
      <div className={styles.sales__content} id='content'>
        <h2 className='main__title'>الخصومات</h2>
        <div className={styles.sales__grid}>
          {countries?.reverse().map((country) => (
            <Link href={`/sales/${country?.id}`} key={country?.id}>
              <div className={styles.sales__card}>
                <Image
                  layout='fill'
                  src={country?.image}
                  alt={country?.name}
                  className={styles.sales__card__img}
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

export default Sales
