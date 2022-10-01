import styles from './index.module.css'
import Link from 'next/link'
import Layout from '../../components/layout'
import Image from 'next/image'
import Head from 'next/head'
import FullPageSlider from '../../components/fullPageSlider'

export const getStaticProps = async () => {
  const [countryRes, slidesRes] = await Promise.all([
    fetch(
      'https://backend.elnagahtravels.com/api/countries?country_for=programs'
    ),
    fetch('https://backend.elnagahtravels.com/api/slides?page=programs'),
  ])
  const [
    { countries = [] },
    {
      data: { slide = [] },
    },
  ] = await Promise.all([countryRes.json(), slidesRes.json()])
  return {
    props: { countries, slide },
    revalidate: 60,
  }
}

const OurPrograms = ({ slide, countries }) => {
  return (
    <Layout>
      <Head>
        <title>البرامج السياحية</title>
      </Head>
      <FullPageSlider
        data={slide}
        title={slide[0]?.title}
        btnText={slide[0]?.button_text}
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
