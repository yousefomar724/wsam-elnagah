import styles from './index.module.css'
import Layout from '../../components/layout'
import Head from 'next/head'
import SpecialCard from '../../components/special/specialCard'
import FullPageSlider from '../../components/fullPageSlider'

export const getStaticProps = async () => {
  const [slidesRes, offerRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/api/slides?page=special_offers'),
    fetch('https://backend.elnagahtravels.com/api/special_offers'),
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
