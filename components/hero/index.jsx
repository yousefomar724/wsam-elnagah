import styles from './index.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'
import { memo, useRef } from 'react'
import AnimatedBtn from '../animatedBtn'
import Image from 'next/image'
import ScrollDown from '../scrollDown'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Hero = ({ data: slides }) => {
  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)
  return (
    <div className={styles.hero}>
      {slides.length > 0 && (
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            type: 'custom',
            renderCustom: function (swiper, cur, total) {
              return `<span class='${styles.swiper__pagination}'>${total} / ${cur}</span>`
            },
          }}
          navigation={{
            prevEl: swiperPrevRef.current,
            nextEl: swiperNextRef.current,
          }}
          effect={'fade'}
          modules={[EffectFade, Autoplay, Pagination, Navigation]}
          className={styles.hero__swiper}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = swiperPrevRef.current
            swiper.params.navigation.nextEl = swiperNextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
        >
          {slides[0].image &&
            slides?.map((slide, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className={styles.hero__img}>
                    <Image
                      layout='fill'
                      src={slide.image}
                      alt={slide.button_text}
                      className={styles.hero__img}
                    />
                  </div>
                  <div className={styles.hero__content}>
                    <div className={styles.hero__container}>
                      <h1 className={styles.hero__title}>{slide.title}</h1>
                      <AnimatedBtn
                        text={slide.button_text}
                        textColor='white'
                        url={slide.link}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
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
      <ScrollDown />
    </div>
  )
}

export default memo(Hero)
