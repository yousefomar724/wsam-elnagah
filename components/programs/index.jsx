import styles from './index.module.css'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import ProgramsCard from './programsCard'
import Link from 'next/link'
import 'swiper/css/navigation'
import 'swiper/css'

const Programs = ({ data: countries, settings }) => {
  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)
  const oddCountries =
    countries?.length % 2 ? countries.slice(0, countries.length - 1) : countries
  return (
    <div className={styles.programs}>
      <div className={styles.programs__container}>
        <h2 className={styles.programs__title}>
          <span>أحدث</span> <span>خصومات</span> <span>البرامج</span>
          <span> السياحية</span>
        </h2>
        {oddCountries.length > 0 && (
          <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
                centeredSlides: true,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: true,
              },
            }}
            spaceBetween={20}
            grabCursor={true}
            loop={true}
            navigation={{
              prevEl: swiperPrevRef.current,
              nextEl: swiperNextRef.current,
            }}
            modules={[Navigation]}
            className={styles.programs__slider}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = swiperPrevRef.current
              swiper.params.navigation.nextEl = swiperNextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            }}
          >
            {oddCountries?.map((country, index) => (
              <SwiperSlide
                key={country.id}
                className={styles.swiper__slider}
                style={index % 2 === 0 ? { transform: 'translateY(50px)' } : {}}
              >
                <ProgramsCard
                  country={country}
                  countries={oddCountries}
                  settings={settings}
                />
              </SwiperSlide>
            ))}
            <div className={styles.swiper__prev} ref={swiperPrevRef}>
              <img
                src='https://www.vision2030.gov.sa/dist/img/icons/prev-arrow.svg'
                alt=''
              />
            </div>
            <div className={styles.swiper__next} ref={swiperNextRef}>
              <img
                src='https://www.vision2030.gov.sa/dist/img/icons/prev-arrow.svg'
                alt=''
              />
            </div>
          </Swiper>
        )}
      </div>
      <Link href='/sales'>
        <a className={styles.view__all}>عرض كل البرامج</a>
      </Link>
    </div>
  )
}

export default Programs
