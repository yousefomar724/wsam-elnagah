import { useRouter } from 'next/router'
import Layout from '../../../../components/layout'
import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedBtn from '../../../../components/animatedBtn'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { AiFillStar } from 'react-icons/ai'
import Head from 'next/head'
import ScrollDown from '../../../../components/scrollDown'
import { useEffect, useState } from 'react'

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

//   // Get all possible routes (paths)
//   const result = [countryNames, categoryIds]
//     .reduce((a, b) =>
//       a.reduce((r, v) => r.concat(b.map((w) => [].concat(v, w))), [])
//     )
//     .map(([place, categoryId]) => ({ place, categoryId }))

//   const paths = result?.map((item) => ({
//     params: { place: item.place, categoryId: item.categoryId.toString() },
//   }))
//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps = async (context) => {
//   const { place, categoryId } = context.params
//   const [countryRes, categoryRes] = await Promise.all([
//     fetch('https://elnagahtravels.com/backend/public/api/countries'),
//     fetch('https://elnagahtravels.com/backend/public/api/categories'),
//   ])
//   const [{ countries = [] }, { categories = [] }] = await Promise.all([
//     countryRes.json(),
//     categoryRes.json(),
//   ])
//   const countryId = countries.find((country) => country.name === place)?.id

//   const response = await fetch(
//     `https://elnagahtravels.com/backend/public/api/programs?country_id=${countryId}&category_id=${categoryId}`
//   )
//   const { programs = [] } = await response.json()
//   return {
//     props: {
//       programs,
//       countries,
//       categories,
//     },
//   }
// }

const Offer = () => {
  const {
    query: { place, categoryId },
  } = useRouter()

  const [countries, setCountries] = useState([])
  const [programs, setPrograms] = useState([])
  const [categories, setCategories] = useState([])
  const [settings, setSettings] = useState({})
  const fetchData = async () => {
    try {
      const [countryRes, categoryRes, settingsRes] = await Promise.all([
        fetch(
          'https://elnagahtravels.com/backend/public/api/countries?country_for=programs'
        ),
        fetch('https://elnagahtravels.com/backend/public/api/categories'),
        fetch('https://elnagahtravels.com/backend/public/api/settings'),
      ])
      const [{ countries = [] }, { categories = [] }, { settings = {} }] =
        await Promise.all([
          countryRes.json(),
          categoryRes.json(),
          settingsRes.json(),
        ])
      const response = await fetch(
        `https://elnagahtravels.com/backend/public/api/programs?country_id=${place}&category_id=${categoryId}`
      )
      const { programs = [] } = await response.json()
      setCountries(countries)
      setPrograms(programs)
      setCategories(categories)
      setSettings(settings)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [place, categoryId])
  const country = countries?.find((country) => country?.id === +place)
  const cat = categories.find((cat) => cat.id === +categoryId)
  const message = (id) => {
    const program = programs?.find((p) => p?.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }
  return (
    <Layout>
      <Head>
        <title>
          {cat?.name} - {country?.name}
        </title>
      </Head>
      <div className={styles.offer__bg}>
        {country?.image && (
          <Image src={country?.image} alt={country?.name} layout='fill' />
        )}
        <h1>
          {cat?.name} - {country?.name}
        </h1>
        <ScrollDown />
      </div>
      <div className={styles.offer}>
        <div className={styles.offer__cards}>
          {programs.length > 0 ? (
            programs.map((program) => (
              <div className={styles.offer__card} key={program.id}>
                <div className={styles.offer__card__container}>
                  <div className={styles.offer__img__container}>
                    {program?.image && (
                      <Image
                        src={program.image}
                        alt={program.title}
                        layout='fill'
                        className={styles.offer__card__img}
                      />
                    )}
                  </div>
                  <div className={styles.offer__card__content}>
                    <div className={styles.offer__card__period}>
                      <span>
                        <BsFillSunFill />
                        {program.days} أيام
                      </span>
                      <span>
                        <BsFillMoonFill />
                        {program.nights} ليالي
                      </span>
                      <span>
                        <MdLocationOn />
                        {program.country}
                      </span>
                    </div>
                    <div className={styles.offer__heading}>
                      <Link
                        href={`/our-programs/${place}/${categoryId}/${program.id}`}
                      >
                        <a>
                          <h3 className={styles.offer__card__title}>
                            {program.title} {cat?.name} {program.rate} نجوم
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
                    <div className={styles.offer__card__price}>
                      <div>
                        <span className={styles.new__price}>
                          {program.price_after_discount}
                        </span>{' '}
                        ريال سعودي
                      </div>
                    </div>
                    <div className={styles.offer__card__btns}>
                      <AnimatedBtn
                        text='تفاصيل العرض'
                        textColor='#222'
                        url={`/our-programs/${place}/${categoryId}/${program.id}`}
                      />
                      <AnimatedBtn
                        text='حجز العرض'
                        textColor='#222'
                        url={`https://api.whatsapp.com/send?phone=${
                          settings?.whatsup
                        }&${message(program?.id)}`}
                        target='_blank'
                        rel='noreferrer'
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>لا توجد برامج</h2>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Offer
