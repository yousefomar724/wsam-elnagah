import styles from './index.module.css'
import { useRouter } from 'next/router'
import Layout from '../../../../../components/layout'
import Image from 'next/image'
import {
  AiOutlineArrowLeft,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillStar,
} from 'react-icons/ai'
import {
  BsFillCircleFill,
  BsCheckCircleFill,
  BsFillSunFill,
  BsFillMoonFill,
} from 'react-icons/bs'
import AnimatedBtn from '../../../../../components/animatedBtn'
import { MdLocationOn } from 'react-icons/md'
import Link from 'next/link'
import Head from 'next/head'
import ScrollDown from '../../../../../components/scrollDown'
import { useEffect, useRef, useState } from 'react'
import Snackbar from '../../../../../components/snackbar'

// export const getStaticProps = async (context) => {
//   const { details: detailsId, categoryId, place } = context.params
//   const response = await fetch(
//     `https://elnagahtravels.com/backend/public/api/programs/${detailsId}`
//   )
//   const { program = {} } = await response.json()

//   // Get Progarams
//   const countryRes = await fetch(
//     `https://elnagahtravels.com/backend/public/api/countries`
//   )
//   const { countries = [] } = await countryRes.json()
//   const countryId = countries.find((country) => country.name === place)?.id

//   const progRes = await fetch(
//     `https://elnagahtravels.com/backend/public/api/programs?country_id=${countryId}&category_id=${categoryId}`
//   )
//   const { programs = [] } = await progRes.json()

//   return {
//     props: {
//       program,
//       programs,
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   // Get Country Names
//   const counRes = await fetch(
//     'https://elnagahtravels.com/backend/public/api/countries'
//   )
//   const { countries = [] } = await counRes.json()
//   const countryNames = countries.map((country) => country.name)

//   // Get Category Ids
//   const catRes = await fetch(
//     'https://elnagahtravels.com/backend/public/api/categories'
//   )
//   const { categories = [] } = await catRes.json()
//   const categoryIds = categories.map((cat) => cat.id)

//   // Get Program Ids
//   const progRes = await fetch(
//     'https://elnagahtravels.com/backend/public/api/programs?country_id=1&category_id=1'
//   )
//   const { programs = [] } = await progRes.json()
//   const programIds = programs.map((prog) => prog.id)

//   // Get all possible routes (paths)
//   const result = [countryNames, categoryIds, programIds]
//     .reduce((a, b) =>
//       a.reduce((r, v) => r.concat(b.map((w) => [].concat(v, w))), [])
//     )
//     .map(([place, categoryId, details]) => ({ place, categoryId, details }))

//   const paths = result?.map((item) => ({
//     params: {
//       place: item.place,
//       categoryId: item.categoryId.toString(),
//       details: item.details.toString(),
//     },
//   }))
//   return {
//     paths,
//     fallback: false,
//   }
// }

const Details = () => {
  const {
    query: { details: detailsId, categoryId, place },
  } = useRouter()

  const [programs, setPrograms] = useState([])
  const [program, setProgram] = useState({})
  const [settings, setSettings] = useState({})
  const [countries, setCountries] = useState([])
  const [formErrors, setFormErrors] = useState({})
  const regex = /^\S+@\S+\.\S+$/

  const [snackbarMsg, setSnackbarMsg] = useState('')
  const snackbarRef = useRef(null)

  const validate = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'الاسم مطلوب'
    }
    if (!values.phone) {
      errors.phone = 'رقم الهاتف مطلوب'
    }
    if (!values.email) {
      errors.email = 'البريد الالكتروني مطلوب'
    } else if (!regex.test(values.email)) {
      errors.email = 'البريد الالكتروني غير صالح'
    }
    if (!values.travling_distnation) {
      errors.travling_distnation = 'حقل السفر الي مطلوب'
    }
    if (!values.ppl_number) {
      errors.ppl_number = 'حقل عدد المسافرين مطلوب'
    }
    if (!values.childs_number) {
      errors.childs_number = 'حقل عدد الاطفال مطلوب'
    }
    if (!values.travling_date) {
      errors.travling_date = 'حقل تاريخ السفر مطلوب'
    }
    return errors
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      // Get data from the form.
      const data = {
        name: event.target.name.value,
        email: event.target.email.value,
        travling_date: event.target.travling_date.value,
        travling_distnation: event.target.travling_distnation.value,
        ppl_number: event.target.ppl_number.value,
        childs_number: event.target.childs_number.value,
        phone: event.target.phone.value,
      }
      setFormErrors(validate(data))

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint = `https://elnagahtravels.com/backend/public/api/programs/${program.id}/reserve`

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
        setSnackbarMsg(result)
        snackbarRef.current.show()
        event.target.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchData = async () => {
    try {
      const [programRes, programsRes, settingsRes, countriesRes] =
        await Promise.all([
          fetch(
            `https://elnagahtravels.com/backend/public/api/programs_details/${detailsId}`
          ),
          fetch(
            `https://elnagahtravels.com/backend/public/api/discounts?country_id=${place}&category_id=${categoryId}`
          ),
          fetch(`https://elnagahtravels.com/backend/public/api/settings`),
          fetch(
            `https://elnagahtravels.com/backend/public/api/countries?country_for=discounts`
          ),
        ])
      const [
        { program: discount = {} },
        { discounts = [] },
        { settings = {} },
        { countries = [] },
      ] = await Promise.all([
        programRes.json(),
        programsRes.json(),
        settingsRes.json(),
        countriesRes.json(),
      ])
      setProgram(discount)
      setPrograms(discounts)
      setSettings(settings)
      setCountries(countries)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [detailsId, place, categoryId])

  const message = (id) => {
    const program = programs?.find((p) => p?.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }

  return (
    <Layout>
      <Head>
        <title>
          {program?.title} - {program?.country?.name}
        </title>
      </Head>
      <div className={styles.details__bg}>
        {program?.image && (
          <Image src={program?.image} alt={program?.title} layout='fill' />
        )}
        <h1>
          {program?.title} - {program?.country?.name}
        </h1>
        <ScrollDown />
      </div>
      <div className={styles.details}>
        <div className={styles.details__info}>
          <h2>
            {program?.title} - {program?.country?.name}
          </h2>
          <div className={styles.details__details}>
            <h3>
              <AiOutlineArrowLeft /> تفاصيل البرنامج السياحي
            </h3>
            <div className={styles.details__days}>
              {program?.program_days?.map((day, i) => (
                <div className={styles.details__day} key={i}>
                  <h4>
                    <BsFillCircleFill /> {day?.name}
                  </h4>
                  <p>{day?.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.details__includes}>
            <h3>
              <AiOutlineArrowLeft />
              مشتملات الرحلة
            </h3>
            <div className={styles.details__contents}>
              <div className={styles.details__content}>
                <h4>الرحلة تشمل:</h4>
                <ul>
                  {program?.includes?.map((item, i) => (
                    <li key={i}>
                      <AiFillPlusCircle className={styles.green} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.details__content}>
                <h4>الرحلة لا تشمل:</h4>
                <ul>
                  {program?.exculdes?.map((item, i) => (
                    <li key={i}>
                      <AiFillMinusCircle className={styles.red} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.details__content}>
                <h4>أنشطة الرحلة:</h4>
                <ul>
                  {program?.activities?.map((item, i) => (
                    <li key={i}>
                      <BsCheckCircleFill className={styles.green} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.details__form}>
          <div className={styles.details__form__card}>
            <h3>السعر</h3>
            <div className={styles.details__card__price}>
              <div>
                <span className={styles.new__price}>
                  {program?.price_after_discount}
                </span>
                ريال سعودي
              </div>
              <div>
                بدلا من
                <span className={styles.old__price}>{program?.price}</span>
              </div>
            </div>
          </div>
          <form className={styles.details__form__cards} onSubmit={handleSubmit}>
            <div className={styles.details__form__card}>
              <label htmlFor='name'>الاسم</label>
              <input type='text' id='name' name='name' placeholder='الاسم' />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.name}
              </small>
            </div>
            <div className={styles.details__form__card}>
              <label htmlFor='email'>البريد الالكتروني</label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='البريد الالكتروني'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.email}
              </small>
            </div>
            <div className={styles.details__form__card}>
              <label htmlFor='phone'>رقم الجوال</label>
              <input
                type='number'
                id='phone'
                name='phone'
                placeholder='رقم الجوال'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.phone}
              </small>
            </div>
            <div className={styles.details__form__card}>
              <label htmlFor='travling_date'>تاريخ السفر</label>
              <input
                type='date'
                id='travling_date'
                name='travling_date'
                placeholder='تاريخ السفر'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.travling_date}
              </small>
            </div>
            <div className={styles.details__form__card}>
              <label htmlFor='travling_distnation'>جهة السفر</label>
              <input
                type='text'
                id='travling_distnation'
                name='travling_distnation'
                placeholder='جهة السفر'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.travling_distnation}
              </small>
            </div>
            <div className={styles.details__form__card}>
              <label htmlFor='ppl_number'>عدد الاشخاص</label>
              <input
                type='number'
                id='ppl_number'
                name='ppl_number'
                placeholder='عدد الاشخاص'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.ppl_number}
              </small>
            </div>
            <div className={styles.details__form__card}>
              <label htmlFor='childs_number'>عدد الاطفال</label>
              <input
                type='number'
                id='childs_number'
                name='childs_number'
                placeholder='عدد الاطفال'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.childs_number}
              </small>
            </div>
            <button className={styles.form__btn} type='submit'>
              ارسال
            </button>
          </form>
          <Snackbar ref={snackbarRef} message={snackbarMsg} type={'success'} />
        </div>
      </div>
      {programs?.filter((prog) => prog?.id !== program?.id).length > 0 && (
        <div className={styles.similar}>
          <h2>برامج مشابهة</h2>
          <div className={styles.similar__cards}>
            {programs
              ?.filter((prog) => prog.id !== program.id)
              .slice(0, 3)
              .map((prog) => (
                <div className={styles.similar__card} key={prog.id}>
                  <div className={styles.similar__card__container}>
                    <div className={styles.similar__img__container}>
                      {prog?.image && (
                        <Image
                          src={prog?.image}
                          alt={prog?.title}
                          layout='fill'
                          className={styles.similar__card__img}
                        />
                      )}
                    </div>
                    <div className={styles.similar__card__content}>
                      <div className={styles.similar__card__period}>
                        <span>
                          <BsFillSunFill />
                          {prog?.days} أيام
                        </span>
                        <span>
                          <BsFillMoonFill />
                          {prog?.nights} ليالي
                        </span>
                        <span>
                          <MdLocationOn />
                          {prog?.country}
                        </span>
                      </div>
                      <div className={styles.similar__heading}>
                        <Link
                          href={`/our-programs/${prog?.country}/${categoryId}/${prog?.id}`}
                        >
                          <a>
                            <h3 className={styles.similar__card__title}>
                              {prog?.title} {prog?.rate} نجوم
                            </h3>
                          </a>
                        </Link>
                        <div className={styles.stars}>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                        </div>
                      </div>
                      <div className={styles.similar__card__price}>
                        <div>
                          <span className={styles.new__price}>
                            {prog?.price_after_discount}
                          </span>{' '}
                          ريال سعودي
                        </div>
                        <div>
                          بدلا من
                          <span className={styles.old__price}>
                            {prog.price}
                          </span>
                        </div>
                      </div>
                      <div className={styles.similar__card__btns}>
                        <AnimatedBtn
                          text='تفاصيل العرض'
                          textColor='#222'
                          url={`/our-programs/${
                            countries?.find((c) => c.name === prog.country)?.id
                          }/${categoryId}/${prog?.id}`}
                        />
                        <AnimatedBtn
                          text='حجز العرض'
                          textColor='#222'
                          url={`https://api.whatsapp.com/send?phone=${
                            settings?.whatsup
                          }&${message(prog?.id)}`}
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
      )}
    </Layout>
  )
}

export default Details
