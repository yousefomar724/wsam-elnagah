import styles from './index.module.css'
import Layout from '../../components/layout'
import Head from 'next/head'
import SpecialCard from '../../components/special/specialCard'
import FullPageSlider from '../../components/fullPageSlider'

export const getStaticProps = async () => {
  try {
    const [slidesRes, offerRes] = await Promise.all([
      fetch(
        'https://elnagahtravels.com/backend/public/api/slides?page=special_offers'
      ),
      fetch('https://elnagahtravels.com/backend/public/api/special_offers'),
    ])
    const [
      {
        data: { slide = [] },
      },
      { special_offers = [] },
    ] = await Promise.all([slidesRes.json(), offerRes.json()])
    return {
      props: {
        slide,
        special_offers,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.log(error)
  }
}

const SpecialOffers = ({ slide, specialOffers }) => {
  return (
    <Layout>
      <Head>
        <title>العروض المميزة</title>
      </Head>
      <FullPageSlider
        data={slide}
        title={slide[0]?.title}
        btnText={slide[0]?.button_text}
        btnUrl={'#content'}
      />
      <div className={styles.offers__content} id='content'>
        <h2 className='main__title'>العروض المميزة</h2>
        <div className={styles.offers__grid}>
          {specialOffers?.map((card) => (
            <SpecialCard item={card} key={card?.id} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default SpecialOffers
