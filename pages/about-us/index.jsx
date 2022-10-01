import styles from './index.module.css'
import Layout from '../../components/layout'
import Head from 'next/head'
import Image from 'next/image'
import { BsFillCircleFill } from 'react-icons/bs'
import ScrollDown from '../../components/scrollDown'

export const getStaticProps = async () => {
  const [aboutRes, slideRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/api/about'),
    fetch('https://backend.elnagahtravels.com/api/slides?page=about'),
  ])
  const [
    data = {},
    {
      data: { slide = [] },
    },
  ] = await Promise.all([aboutRes.json(), slideRes.json()])
  return {
    props: {
      data,
      slide,
    },
    revalidate: 60,
  }
}

const AboutUs = ({ data, slide }) => {
  const { images = [], achievements = [], steps = [] } = data
  return (
    <Layout>
      <Head>
        <title>{slide[0]?.title}</title>
      </Head>
      <div className={styles.hero__bg}>
        {slide[0]?.image && (
          <Image src={slide[0]?.image} alt={slide[0]?.title} layout='fill' />
        )}
        <h1>{slide[0]?.title}</h1>
        <ScrollDown />
      </div>
      <div className={styles.about__us}>
        <div className={styles.about__us__best}>
          <h3 className='main__title'>انجازاتنا تتحدث عنا</h3>
          <div>
            <h5>وسام النجاح للسفر والسياحة</h5>
            <h6>وسام النجاح للسفر و السياحة تقف اليوم ـ بكل فخر</h6>
            {achievements.map((achievement) => (
              <p key={achievement?.title}>
                <BsFillCircleFill />
                <span>{achievement?.title}</span>
                <br /> - {achievement?.subtitle}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.about__us__options}>
        <div className={styles.about__us__options__img}>
          <Image layout='fill' src='/boat.gif' alt='' />
        </div>
        <div className={styles.about__us__cards}>
          {steps.map((card) => (
            <div className={styles.about__us__card} key={card.title}>
              <h3>{card?.title}</h3>
              <p>{card?.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.about__us__grid}>
        <div>
          <img src={images[0]?.image} alt='' />
        </div>
        <div className={styles.v__stretch}>
          <img src={images[1]?.image} alt='' />
        </div>
        <div className={styles.h__stretch}>
          <img src={images[2]?.image} alt='' />
        </div>
        <div>
          <img src={images[3]?.image} alt='' />
        </div>
        <div>
          <img src={images[4]?.image} alt='' />
        </div>
        <div className={styles.v__stretch}>
          <img src={images[5]?.image} alt='' />
        </div>
        <div className={styles.big__stretch}>
          <img src={images[6]?.image} alt='' />
        </div>
        <div>
          <img src={images[7]?.image} alt='' />
        </div>
        <div className={styles.h__stretch}>
          <img src={images[8]?.image} alt='' />
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs
