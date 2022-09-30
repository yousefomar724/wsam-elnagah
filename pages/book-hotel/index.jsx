import styles from './index.module.css'
import Layout from '../../components/layout'
import FullPageSlider from '../../components/fullPageSlider'
import Head from 'next/head'
import Hotels from '../../components/hotels'

export const getStaticProps = async () => {
  try {
    const [hotelsRes, slideRes, settingsRes] = await Promise.all([
      fetch('https://elnagahtravels.com/backend/public/api/hotels'),
      fetch('https://elnagahtravels.com/backend/public/api/slides?page=hotels'),
      fetch('https://elnagahtravels.com/backend/public/api/settings'),
    ])
    const [
      { hotels = [] },
      {
        data: { slide = [] },
      },
      { settings = {} },
    ] = await Promise.all([
      hotelsRes.json(),
      slideRes.json(),
      settingsRes.json(),
    ])
    return {
      props: {
        hotels,
        slide,
        settings,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.log(error)
  }
}

const BookHotel = ({ hotels, settings, slide }) => {
  return (
    <Layout>
      <Head>
        <title>حجز فندق</title>
      </Head>
      <FullPageSlider
        data={slide}
        title={slide[0]?.title}
        btnText={slide[0]?.button_text}
        btnUrl={'#hotels'}
      />
      <Hotels hotels={hotels} settings={settings} />
      <div className='spikes'></div>
      <div className={styles.form} id='form'>
        <div className={styles.form__bg}></div>
        <div className={styles.form__data}>
          <form
            className={styles.form__content}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={styles.full__name}>
              <label htmlFor='name'>الاسم بالكامل</label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='الاسم بالكامل'
              />
            </div>
            <div className={styles.phone}>
              <label htmlFor='phone'>رقم الجوال</label>
              <input
                type='number'
                id='phone'
                name='phone'
                placeholder='رقم الجوال'
              />
            </div>
            <div className='email'>
              <label htmlFor='email'>البريد الالكتروني</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='البريد الالكتروني'
              />
            </div>
            <div className='hotel'>
              <label htmlFor='hotel'>اسم الفندق المطلوب</label>
              <input
                type='text'
                id='hotel'
                name='hotel'
                placeholder='اسم الفندق المطلوب'
              />
            </div>
            <div className='dist'>
              <label htmlFor='dist'>الوجهة المطلوبة</label>
              <input
                type='text'
                id='dist'
                name='dist'
                placeholder='الوجهة المطلوبة'
              />
            </div>
            <div className={styles.message}>
              <label htmlFor='message'>تفاصيل اخري</label>
              <textarea
                id='message'
                name='message'
                placeholder='تفاصيل اخري'
                rows='5'
              />
            </div>
            <button type='submit' className={styles.form__btn}>
              ارسال
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default BookHotel
