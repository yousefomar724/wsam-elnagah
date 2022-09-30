import styles from './index.module.css'
import Image from 'next/image'
import Layout from '../../components/layout'
import Head from 'next/head'
import {
  BsEnvelopeFill,
  BsFillPeopleFill,
  BsInstagram,
  BsPhoneFill,
  BsSnapchat,
  BsTwitter,
  BsWhatsapp,
  BsYoutube,
} from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { GiRotaryPhone } from 'react-icons/gi'
import { FaTiktok } from 'react-icons/fa'
import ScrollDown from '../../components/scrollDown'
import { useRef, useState } from 'react'
import Snackbar from '../../components/snackbar'

export const getStaticProps = async () => {
  try {
    const [response, settingsRes] = await Promise.all([
      fetch(
        'https://elnagahtravels.com/backend/public/api/slides?page=aviation'
      ),
      fetch('https://elnagahtravels.com/backend/public/api/settings'),
    ])
    const [
      {
        data: { slide },
      },
      { settings = {} },
    ] = await Promise.all([response.json(), settingsRes.json()])
    return {
      props: {
        slide,
        settings,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.log(error)
  }
}

const Aviation = ({ settings, slide }) => {
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const snackbarRef = useRef(null)
  const [snackbarMsg2, setSnackbarMsg2] = useState('')
  const snackbarRef2 = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const [formErrors2, setFormErrors2] = useState({})
  const validate = (values) => {
    const errors = {}
    if (!values.fullname) {
      errors.fullname = 'الاسم بالكامل مطلوب'
    }
    if (!values.phone) {
      errors.phone = 'رقم الهاتف مطلوب'
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
    if (!values.back_date) {
      errors.back_date = 'حقل تاريخ العودة مطلوب'
    }
    return errors
  }
  const validate2 = (values) => {
    const errors = {}
    if (!values.type) {
      errors.type = 'نوع الرحلة مطلوب'
    }
    if (!values.travellers_number) {
      errors.travellers_number = 'عدد المسافرين مطلوب'
    }
    if (!values.travel_from) {
      errors.travel_from = 'حقل السفر من مطلوب'
    }
    if (!values.travel_to) {
      errors.travel_to = 'حقل السفر الي مطلوب'
    }
    if (!values.traveling_date) {
      errors.traveling_date = 'حقل تاريخ السفر مطلوب'
    }
    if (!values.back_date) {
      errors.back_date = 'حقل تاريخ العودة مطلوب'
    }
    return errors
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      // Get data from the form.
      const data = {
        travel_from: event.target.travel_from.value,
        travel_to: event.target.travel_to.value,
        traveling_date: event.target.traveling_date.value,
        back_date: event.target.back_date.value,
        fullname: event.target.fullname.value,
        phone: event.target.phone.value,
        childs: event.target.childs.value,
        adults: event.target.adults.value,
        notes: event.target.notes.value,
      }
      setFormErrors(validate(data))
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint = 'https://elnagahtravels.com/backend/public/api/aviation'

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
  const handleSubmit2 = async (event) => {
    try {
      event.preventDefault()

      // Get data from the form.
      const data = {
        travel_from: event.target.travel_from.value,
        travel_to: event.target.travel_to.value,
        traveling_date: event.target.traveling_date.value,
        back_date: event.target.back_date.value,
        type: event.target.type.value,
        retreiv_taxes: event.target.retreiv_taxes.checked ? '1' : '0',
        direct_trips: event.target.direct_trips.checked ? '1' : '0',
        travellers_number: event.target.travellers_number.value,
      }
      setFormErrors2(validate2(data))
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint = 'https://elnagahtravels.com/backend/public/api/aviation2'

      // Form the request for sending data to the server.
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      const response = await fetch(endpoint, options)

      if (Object.keys(validate2(data)).length === 0) {
        const result = await response.json()
        setSnackbarMsg2(result?.message || result)
        snackbarRef2.current.show()
        event.target.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <Head>
        <title>الطيران</title>
      </Head>
      <div className={styles.hero__bg}>
        {slide[0]?.image && (
          <Image
            src={slide[0]?.image}
            alt={slide[0]?.title}
            layout='fill'
            objectFit='cover'
            objectPosition='center'
          />
        )}
        <h1 className={styles.hero__title}>{slide[0]?.title}</h1>
        <p className={styles.hero__text}>{slide[0]?.button_text}</p>
        <ScrollDown />
      </div>
      <div className={styles.form}>
        <h2 className={styles.form__title}>
          أدخل بياناتك واستلم تذكرتك وانت بمكانك
        </h2>
        <form className={styles.form__search} onSubmit={handleSubmit2}>
          <div className={styles.search__select}>
            <div className={styles.search__content}>
              <div className={styles.select}>
                <input type='radio' value='go' id='oneway' name='type' />
                <label htmlFor='oneway'>ذهاب فقط</label>
              </div>
              <div className={styles.select}>
                <input type='radio' value='goAndBack' id='round' name='type' />
                <label htmlFor='round'>ذهاب وعودة</label>
              </div>
              <div className={styles.select}>
                <input type='radio' value='multi' id='multible' name='type' />
                <label htmlFor='multible'>وجهات متعددة</label>
              </div>
            </div>
            <small style={{ color: 'red', fontSize: '.6rem' }}>
              {formErrors2?.type}
            </small>
            <h3 className={styles.search__title}>احجز تذاكر الطيران الان</h3>
          </div>
          <div className={styles.search__dist}>
            <div className={styles.card}>
              <h5 className={styles.card__title}>من</h5>
              <div>
                <MdLocationOn />
                <input
                  type='text'
                  placeholder='بلد المسكن'
                  name='travel_from'
                  id='travel_from'
                  className={styles.card__input}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.travel_from}
              </small>
            </div>
            <div className={styles.card}>
              <h5 className={styles.card__title}>الي</h5>
              <div>
                <MdLocationOn />
                <input
                  type='text'
                  placeholder='الوجهة'
                  name='travel_to'
                  id='travel_to'
                  className={styles.card__input}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.travel_to}
              </small>
            </div>
            <div className={styles.card}>
              <h5 className={styles.card__title}>تاريخ السفر</h5>
              <div>
                <input
                  type='date'
                  name='traveling_date'
                  id='traveling_date'
                  pattern='\d{2}-\d{2}-\d{4}'
                  className={styles.card__input}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.traveling_date}
              </small>
            </div>
            <div className={styles.card}>
              <h5 className={styles.card__title}>تاريخ العودة</h5>
              <div>
                <input
                  type='date'
                  name='back_date'
                  id='back_date'
                  pattern='\d{2}-\d{2}-\d{4}'
                  className={styles.card__input}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.back_date}
              </small>
            </div>
            <div className={styles.card} style={{ border: 'none' }}>
              <h5 className={styles.card__title}>عدد المسافرين</h5>
              <div>
                <BsFillPeopleFill />
                <input
                  type='number'
                  name='travellers_number'
                  placeholder='عدد المسافرين'
                  className={styles.card__input}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.travellers_number}
              </small>
            </div>
          </div>
          <div className={styles.search__checkbox}>
            <input type='checkbox' name='direct_trips' id='direct_trips' />
            <label htmlFor='direct_trips'>رحلات مباشرة</label>
            <input type='checkbox' name='retreiv_taxes' id='retreiv_taxes' />
            <label htmlFor='retreiv_taxes'>ضريبة الاسترجاع</label>
          </div>
          <button type='submit' className={styles.form__btn}>
            تسجيل
          </button>
        </form>
        <Snackbar ref={snackbarRef2} message={snackbarMsg2} type={'success'} />

        <div className={styles.form__data} id='form'>
          <form className={styles.form__content} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor='firstname'>الاسم بالكامل</label>
                <input
                  type='text'
                  id='firstname'
                  name='fullname'
                  placeholder='الاسم بالكامل'
                  className={styles.form__input}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.fullname}
                </small>
              </div>
              <div className={styles.field}>
                <label htmlFor='phone'>رقم الجوال</label>
                <input
                  type='number'
                  id='phone'
                  name='phone'
                  placeholder='رقم الجوال'
                  className={styles.form__input}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.phone}
                </small>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor='passengers'>عدد البالغين</label>
                <input
                  type='number'
                  id='passengers'
                  name='adults'
                  placeholder='عدد المسافرين'
                  className={styles.form__input}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.adults}
                </small>
              </div>
              <div className={styles.field}>
                <label htmlFor='children'>عدد الاطفال</label>
                <input
                  type='number'
                  id='children'
                  name='childs'
                  placeholder='عدد الاطفال'
                  className={styles.form__input}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.childs}
                </small>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor='from'>السفر من</label>
                <input
                  type='text'
                  id='from'
                  name='travel_from'
                  placeholder='بلد المسكن'
                  className={styles.form__input}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.travel_from}
                </small>
              </div>
              <div className={styles.field}>
                <label htmlFor='to'>السفر الي</label>
                <input
                  type='text'
                  id='to'
                  name='travel_to'
                  placeholder='الوجهة'
                  className={styles.form__input}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.travel_to}
                </small>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor='date'>تاريخ السفر</label>
                <input
                  type='date'
                  id='date'
                  name='traveling_date'
                  placeholder='تاريخ السفر'
                  className={styles.form__input}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.traveling_date}
                </small>
              </div>
              <div className={styles.field}>
                <label htmlFor='backdate'>تاريخ العودة</label>
                <input
                  type='date'
                  id='backdate'
                  name='back_date'
                  placeholder='تاريخ العودة'
                  className={styles.form__input}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.back_date}
                </small>
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor='details'>تفاصيل أخري</label>
              <textarea
                id='details'
                name='notes'
                placeholder='اكتب اي تفاصيل أخري هنا...'
                rows='5'
                cols='2'
                className={styles.form__input}
              />
            </div>
            <button type='submit' className={styles.form__btn}>
              ارسال
            </button>
          </form>
          <Snackbar ref={snackbarRef} message={snackbarMsg} type={'success'} />
          <div className={styles.form__img}>
            <h3 className='main__title' id='main-title'>
              تواصل معنا عبر
            </h3>
            <div className={styles.contact__data}>
              <div className={styles.contact__data__card}>
                <h3 className={styles.contact__title}>الجوال</h3>
                <div className={styles.contact__card}>
                  <a
                    href={`tel:${settings?.mobile}`}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.contact__link}
                  >
                    {settings?.mobile}
                  </a>
                  <BsPhoneFill />
                </div>
                <div className={styles.contact__card}>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}`}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.contact__link}
                  >
                    {settings?.whatsup}
                  </a>
                  <BsWhatsapp />
                </div>
                <div className={styles.contact__card}>
                  <a
                    href={`tel:${settings?.phone}`}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.contact__link}
                  >
                    {settings?.phone}
                  </a>
                  <GiRotaryPhone />
                </div>
              </div>
              <div className={styles.contact__data__card}>
                <h3 className={styles.contact__title}>البريد الالكتروني</h3>
                <div className={styles.contact__card}>
                  <a
                    href={`mailto:${settings?.email}`}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.contact__link}
                  >
                    {settings?.email}
                  </a>
                  <BsEnvelopeFill />
                </div>
              </div>
              <div className={styles.contact__data__card}>
                <h3 className={styles.contact__title}>العنوان</h3>
                <div className={styles.address}>
                  <MdLocationOn />
                  <span>{settings?.address}</span>
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
    </Layout>
  )
}

export default Aviation
