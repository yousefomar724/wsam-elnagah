import styles from './index.module.css'
import Layout from '../../components/layout'
import AnimatedBtn from '../../components/animatedBtn'
import Image from 'next/image'
import Head from 'next/head'
import { AiFillStar } from 'react-icons/ai'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import FullPageSlider from '../../components/fullPageSlider'

export const getStaticProps = async () => {
  const [programsRes, slidesRes, settingsRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/api/sea_trips'),
    fetch('https://backend.elnagahtravels.com/api/slides?page=sea-trips'),
    fetch('https://backend.elnagahtravels.com/api/settings'),
  ])

  const [
    { programs = [] },
    {
      data: { slide = [] },
    },
    { settings = {} },
  ] = await Promise.all([
    programsRes.json(),
    slidesRes.json(),
    settingsRes.json(),
  ])
  return {
    props: {
      programs,
      settings,
      slide,
    },
  }
}

const SeaTripes = ({ slide, settings, programs }) => {
  const message = (id) => {
    const program = programs?.find((p) => p?.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }
  return (
    <Layout>
      <Head>
        <title>الرحلات البحرية</title>
      </Head>
      <FullPageSlider
        data={slide}
        title={slide[0]?.title}
        btnText={slide[0]?.button_text}
        btnUrl={'#content'}
      />
      <div className={styles.seaTripes__content} id='content'>
        <h2 className='main__title'>الرحلات البحرية</h2>
        <div className={styles.offer__cards}>
          {programs?.map((card) => (
            <div className={styles.offer__card} key={card.id}>
              <div className={styles.offer__card__container}>
                <div className={styles.offer__img__container}>
                  <Image
                    src={card?.image}
                    alt={card?.title}
                    layout='fill'
                    className={styles.offer__card__img}
                  />
                </div>
                <div className={styles.offer__card__content}>
                  <div className={styles.offer__card__period}>
                    <span>
                      <BsFillSunFill />
                      {card?.days} أيام
                    </span>
                    <span>
                      <BsFillMoonFill />
                      {card?.nights} ليالي
                    </span>
                  </div>
                  <div className={styles.offer__heading}>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <h3 className={styles.offer__card__title}>
                        {card.title}
                      </h3>
                    </a>
                    <div className={styles.stars}>
                      {Array.from(Array(card.rate)).map((s, i) => (
                        <AiFillStar key={i} />
                      ))}
                    </div>
                  </div>
                  <div className={styles.offer__card__price}>
                    <div>
                      <span className={styles.new__price}>
                        {card?.price_after_discount}
                      </span>{' '}
                      ريال سعودي
                    </div>
                    <p
                      style={{
                        display: 'flex',
                        justifyContent: ' flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <span>بدلا من</span>
                      <span style={{ textDecoration: 'line-through' }}>
                        {card?.price}
                      </span>
                    </p>
                  </div>
                  <p className={styles.sales}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                      <path d='m30.718 13.042.002-9.522a2.243 2.243 0 0 0-2.24-2.24l-9.52.002-.402-.002c-.83 0-1.62.048-2.19.618L1.822 16.442a1.83 1.83 0 0 0-.542 1.308c0 .495.192.96.542 1.308l11.12 11.12c.348.35.813.542 1.308.542.492 0 .96-.192 1.308-.542l14.544-14.546c.626-.622.62-1.52.618-2.384l-.002-.206zM24.96 8.96a1.92 1.92 0 1 1 .001-3.841 1.92 1.92 0 0 1-.001 3.841z'></path>
                    </svg>
                    وفر:
                    <span>{card?.price - card?.price_after_discount}</span>
                    ريال سعودي
                  </p>
                  <div className={styles.offer__card__btns}>
                    <AnimatedBtn
                      text='حجز العرض'
                      textColor='#222'
                      url={`https://api.whatsapp.com/send?phone=${
                        settings?.whatsup
                      }&${message(card?.id)}`}
                      target='_blank'
                      rel='noreferrer'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default SeaTripes
