import styles from './index.module.css'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'

// export const getStaticProps = async () => {
//   const response = await fetch(
//     'https://elnagahtravels.com/backend/public/api/categories'
//   )
//   const { categories = [] } = await response.json()
//   return {
//     props: {
//       categories,
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   const response = await fetch(
//     'https://elnagahtravels.com/backend/public/api/countries'
//   )
//   const { countries = [] } = await response.json()
//   const countrySlugs = countries?.map((country) => country.name)
//   const paths = countrySlugs?.map((slug) => ({ params: { place: slug } }))
//   return {
//     paths,
//     fallback: false,
//   }
// }

const Place = () => {
  const {
    query: { place },
  } = useRouter()
  const [categories, setCategories] = useState([])
  const [countries, setCountries] = useState([])
  const fetchData = async () => {
    try {
      const [response, countriesRes] = await Promise.all([
        fetch(
          `https://elnagahtravels.com/backend/public/api/programs/categories?country_id=${place}`
        ),
        fetch(
          `https://elnagahtravels.com/backend/public/api/countries?country_for=programs`
        ),
      ])
      const [{ categories = [] }, { countries = [] }] = await Promise.all([
        response.json(),
        countriesRes.json(),
      ])
      setCategories(categories)
      setCountries(countries)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [place])
  const country = countries?.find((country) => country?.id === +place)
  return (
    <Layout>
      <Head>
        <title>{country?.name}</title>
      </Head>
      <div className={styles.place}>
        <div
          className={styles.place__bg}
          style={{ backgroundImage: `url(${country?.image})` }}
        >
          <h1>{country?.name}</h1>
        </div>
        <div className={styles.place__grid}>
          {categories.length > 0 ? (
            categories[0]?.image &&
            categories.map((category) => (
              <Link
                href={`/our-programs/${place}/${category?.id}`}
                key={category?.id}
              >
                <div className={styles.place__card}>
                  <Image
                    layout='fill'
                    src={category?.image}
                    alt={category?.name}
                    className={styles.place__card__img}
                  />
                  <h3>{category?.name}</h3>
                </div>
              </Link>
            ))
          ) : (
            <h2>لا توجد نتائج</h2>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Place
