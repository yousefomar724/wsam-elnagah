import Head from 'next/head'
import Layout from '../../components/layout'
import styles from './index.module.css'
import Image from 'next/image'
import AnimatedBtn from '../../components/animatedBtn'
import {
  BsEnvelopeFill,
  BsInstagram,
  BsPhoneFill,
  BsSnapchat,
  BsTwitter,
  BsWhatsapp,
  BsYoutube,
} from 'react-icons/bs'
import { GiRotaryPhone } from 'react-icons/gi'
import { MdLocationOn } from 'react-icons/md'
import { FaTiktok } from 'react-icons/fa'
import ScrollDown from '../../components/scrollDown'
import { useEffect, useRef, useState } from 'react'
import Snackbar from '../../components/snackbar'

export const getStaticProps = async () => {
  try {
    const [dataRes, slideRes, settingsRes] = await Promise.all([
      fetch('https://elnagahtravels.com/backend/public/api/design_program'),
      fetch(
        'https://elnagahtravels.com/backend/public/api/slides?page=design-program'
      ),
      fetch('https://elnagahtravels.com/backend/public/api/settings'),
    ])
    const [
      { hotels: data = {} },
      {
        data: { slide = [] },
      },
      { settings = {} },
    ] = await Promise.all([dataRes.json(), slideRes.json(), settingsRes.json()])
    return {
      props: {
        data,
        slide,
        settings,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.log(error)
  }
}

const DesignProgram = ({ data, slide, settings }) => {
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [formErros, setFormErrors] = useState({})
  const snackbarRef = useRef(null)
  const regex = /^\S+@\S+\.\S+$/
  const validate = (values) => {
    const errors = {}
    if (!values.first_name) {
      errors.first_name = 'الاسم الاول مطلوب'
    }
    if (!values.family_name) {
      errors.family_name = 'اسم العائلة مطلوب'
    }
    if (!values.phone) {
      errors.phone = 'رقم الهاتف مطلوب'
    }
    if (!values.email) {
      errors.email = 'البريد الالكتروني مطلوب'
    } else if (!regex.test(values.email)) {
      errors.email = 'البريد الالكتروني غير صالح'
    }
    if (!values.travel_from) {
      errors.travel_from = 'حقل السفر من مطلوب'
    }
    if (!values.travel_to) {
      errors.travel_to = 'حقل السفر الي مطلوب'
    }
    if (!values.adults) {
      errors.adults = 'حقل عدد المسافرين مطلوب'
    }
    if (!values.childs) {
      errors.childs = 'حقل عدد الاطفال مطلوب'
    }
    if (!values.traveling_date) {
      errors.traveling_date = 'حقل تاريخ السفر مطلوب'
    }
    if (!values.travel_need) {
      errors.travel_need = 'حقل متطلبات السفر مطلوب'
    }
    return errors
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      // Get data from the form.
      const data = {
        first_name: event.target.first_name.value,
        family_name: event.target.family_name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        travel_from: event.target.travel_from.value,
        travel_to: event.target.travel_to.value,
        traveling_date: event.target.traveling_date.value,
        childs: event.target.childs.value,
        adults: event.target.adults.value,
        travel_need: event.target.travel_need.value,
        notes: event.target.notes.value,
      }
      setFormErrors(validate(data))

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint =
        'https://elnagahtravels.com/backend/public/api/design_program/order'

      // Form the request for sending data to the server.
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      if (Object.keys(validate(data)).length === 0) {
        const response = await fetch(endpoint, options)
        const result = await response.json()
        setSnackbarMsg(result?.message || result)
        snackbarRef.current.show()
        event.target.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const message = `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة`
  return (
    <Layout>
      <Head>
        <title>{data?.title}</title>
      </Head>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${slide[0]?.image})` }}
      >
        <div className={styles.hero__bg}>
          <h1>{data.title}</h1>
          <AnimatedBtn text={slide[0]?.button_text} url='#form' />
          <ScrollDown />
        </div>
        <div className={styles.card}>
          <div className={styles.card__container}>
            <div className={styles.card__content}>
              <h3>{data?.subtitle}</h3>
              <h4>
                {data?.content}
                {/* <BsTwitter /> */}
                {data?.icon && (
                  <Image
                    src={data?.icon}
                    width={55}
                    height={57}
                    alt='social media icon'
                  />
                )}
              </h4>
              {data?.image && (
                <a
                  href={data.social_link}
                  className={styles.card__content__img}
                >
                  <Image src={data?.image} alt='card' layout='fill' />
                </a>
              )}
              <p>
                تابعو حسابنا في تويتر شركة وسام النجاح{' '}
                <a href={data?.social_link}>{data?.social_text}</a>{' '}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.form} id='form'>
          <div className={styles.form__bg}></div>
          <h2>صمم برنامجك بطريقتك</h2>
          <div className={styles.form__data}>
            <form className={styles.form__content} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div>
                  <label htmlFor='firstname'>الاسم الاول</label>
                  <input
                    type='text'
                    id='firstname'
                    name='first_name'
                    placeholder='الاسم الاول'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.first_name}
                  </small>
                </div>
                <div>
                  <label htmlFor='lastname'>اسم العائلة</label>
                  <input
                    type='text'
                    id='lastname'
                    name='family_name'
                    placeholder='اسم العائلة'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.family_name}
                  </small>
                </div>
              </div>
              <div className={styles.row}>
                <div>
                  <label htmlFor='phone'>رقم الجوال</label>
                  <input
                    type='number'
                    id='phone'
                    name='phone'
                    placeholder='رقم الجوال'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.phone}
                  </small>
                </div>
                <div>
                  <label htmlFor='email'>البريد الالكتروني</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='البريد الالكتروني'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.email}
                  </small>
                </div>
              </div>
              <div className={styles.row}>
                <div>
                  <label htmlFor='from'>السفر من</label>
                  <input
                    type='text'
                    id='from'
                    name='travel_from'
                    placeholder='بلد المسكن'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.travel_from}
                  </small>
                </div>
                <div>
                  <label htmlFor='to'>السفر الي</label>
                  <input
                    type='text'
                    id='to'
                    name='travel_to'
                    placeholder='الوجهة'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.travel_to}
                  </small>
                </div>
              </div>
              <div className={styles.row}>
                <div>
                  <label htmlFor='passengers'>عدد المسافرين</label>
                  <input
                    type='number'
                    id='passengers'
                    name='adults'
                    placeholder='عدد المسافرين'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.adults}
                  </small>
                </div>
                <div>
                  <label htmlFor='children'>عدد الاطفال</label>
                  <input
                    type='number'
                    id='children'
                    name='childs'
                    placeholder='عدد الاطفال'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.childs}
                  </small>
                </div>
              </div>
              <div className={styles.row}>
                <div>
                  <label htmlFor='date'>تاريخ السفر</label>
                  <input
                    type='date'
                    id='date'
                    name='traveling_date'
                    placeholder='تاريخ السفر'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.traveling_date}
                  </small>
                </div>
                <div>
                  <label htmlFor='needs'>متطلبات السفر</label>
                  <input
                    type='text'
                    id='needs'
                    name='travel_need'
                    placeholder='متطلبات السفر'
                  />
                  <small style={{ color: 'red', fontSize: '.6rem' }}>
                    {formErros?.travel_need}
                  </small>
                </div>
              </div>
              <div className={styles.message}>
                <label htmlFor='details'>تفاصيل أخري</label>
                <textarea
                  id='details'
                  name='notes'
                  placeholder='اكتب اي تفاصيل أخري هنا...'
                  rows='5'
                  cols='2'
                />
              </div>
              <button type='submit' className={styles.form__btn}>
                ارسال
              </button>
            </form>
            <Snackbar
              ref={snackbarRef}
              message={snackbarMsg}
              type={'success'}
            />
            <div className={styles.form__img}>
              <div className={styles.form__img__content}>
                <h3 className='main__title'>تواصل معنا عبر</h3>
                <div className={styles.contact__data}>
                  <div className={styles.contact__data__card}>
                    <h3>الجوال</h3>
                    <div className={styles.phone}>
                      <div>
                        <a
                          href={`tel:${settings?.mobile}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {settings?.mobile}
                        </a>
                        <BsPhoneFill />
                      </div>
                      <div>
                        <a
                          href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}&${message}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {settings?.whatsup}
                        </a>
                        <BsWhatsapp />
                      </div>
                      <div>
                        <a
                          href={`tel:${settings?.phone}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {settings?.phone}
                        </a>
                        <GiRotaryPhone />
                      </div>
                    </div>
                  </div>
                  <div className={styles.contact__data__card}>
                    <h3>البريد الالكتروني</h3>
                    <div>
                      <a
                        href={`mailto:${settings?.email}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {settings?.email}
                      </a>
                      <BsEnvelopeFill />
                    </div>
                  </div>
                  <div className={styles.contact__data__card}>
                    <h3>العنوان</h3>
                    <div>
                      <div>{settings?.address}</div>
                      <MdLocationOn />
                    </div>
                  </div>
                </div>
                <div className={styles.social__icons}>
                  <a
                    href={settings?.instagram}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.instagram}
                  >
                    <BsInstagram />
                  </a>
                  <a
                    href={settings?.twitter}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.twitter}
                  >
                    <BsTwitter />
                  </a>
                  <a
                    href={settings?.tiktok}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.tiktok}
                  >
                    <FaTiktok />
                  </a>
                  <a
                    href={settings?.snapchat}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.snapchat}
                  >
                    <BsSnapchat />
                  </a>
                  <a
                    href={settings?.youtube}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.youtube}
                  >
                    <BsYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DesignProgram
