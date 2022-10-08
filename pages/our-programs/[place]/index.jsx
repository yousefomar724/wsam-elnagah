import styles from './index.module.css'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

export const getStaticPaths = async () => {
  const response = await fetch(
    'https://backend.elnagahtravels.com/api/countries?country_for=programs'
  )
  const { countries = [] } = await response.json()
  const countrySlugs = countries?.map((country) => country.id.toString())
  const paths = countrySlugs?.map((slug) => ({ params: { place: slug } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const [response, countriesRes] = await Promise.all([
    fetch(
      `https://backend.elnagahtravels.com/api/programs/categories?country_id=${params.place}`
    ),
    fetch(
      `https://backend.elnagahtravels.com/api/countries?country_for=programs`
    ),
  ])
  const [{ categories = [] }, { countries = [] }] = await Promise.all([
    response.json(),
    countriesRes.json(),
  ])
  return {
    props: { countries, categories },
    revalidate: 60,
  }
}

const Place = ({ countries, categories }) => {
  const {
    query: { place },
  } = useRouter()
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
