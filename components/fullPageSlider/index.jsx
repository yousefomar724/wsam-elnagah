import styles from './index.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay } from 'swiper'
import AnimatedBtn from '../animatedBtn'
import Image from 'next/image'
import ScrollDown from '../scrollDown'
import { memo } from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'

const FullPageSlider = ({ title, btnText, btnUrl, data }) => {
  return (
    <div className={styles.slider}>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect={'fade'}
        modules={[EffectFade, Autoplay]}
        className={styles.slider__swiper}
      >
        {data?.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div className={styles.slider__img}>
                <Image
                  layout='fill'
                  src={item?.img || item?.image || item}
                  alt={`${title}-${i}`}
                  objectFit='cover'
                  objectPosition='center'
                />
              </div>
              <div className={styles.slider__content}>
                <div className={styles.slider__container}>
                  <h1 className={styles.slider__title}>
                    {item?.title || title}
                  </h1>
                  <AnimatedBtn
                    text={item?.button_text || btnText}
                    textColor='white'
                    url={btnUrl}
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <ScrollDown />
    </div>
  )
}

export default memo(FullPageSlider)
