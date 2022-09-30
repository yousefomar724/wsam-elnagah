import styles from './index.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import SpecialCard from './specialCard'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/navigation'

const Special = ({ data, settings }) => {
  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)
  return (
    <div className={styles.news__container}>
      <h3 className={styles.news__title}>العروض المميزة</h3>
      {data.length > 0 && (
        <Swiper
          slidesPerView={'auto'}
          centeredSlides={true}
          spaceBetween={20}
          breakpoints={{
            768: {
              slidesPerView: 2,
              centeredSlides: true,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          loop={true}
          grabCursor={true}
          navigation={{
            prevEl: swiperPrevRef.current,
            nextEl: swiperNextRef.current,
          }}
          modules={[Navigation]}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = swiperPrevRef.current
            swiper.params.navigation.nextEl = swiperNextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          className={styles.news__swiper}
        >
          {data.map((item) => (
            <SwiperSlide
              key={item?.id}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexShrink: 'initial',
              }}
            >
              <SpecialCard item={item} settings={settings} />
            </SwiperSlide>
          ))}
          <div className={styles.swiper__prev} ref={swiperPrevRef}>
            <img src='/prev-arrow-gray.svg' alt='' />
            Prev
          </div>
          <div className={styles.swiper__next} ref={swiperNextRef}>
            <img src='/next-arrow-gray.svg' alt='' />
            Next
          </div>
        </Swiper>
      )}
      <Link href='/special-offers'>
        <a className={styles.view__all}>عرض الكل</a>
      </Link>
    </div>
  )
}

export default Special
