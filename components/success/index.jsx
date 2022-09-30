import styles from './index.module.css'
import { memo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper'
import Image from 'next/image'
import AnimatedBtn from '../animatedBtn'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/effect-fade'

const Success = ({ data, features_slides }) => {
  const [value, setValue] = useState(0)
  return (
    <div className={styles.success} id='success'>
      <div className={styles.success__container}>
        <div className={styles.success__top}>
          <h2 className={styles.success__title}>مميزات وسام النجاح</h2>
          <div className={styles.success__tabs}>
            {data.map((tab, i) => (
              <button
                key={i}
                onClick={() => setValue(i)}
                className={`${styles.success__tab} ${
                  value === i ? styles.success__tab__active : ''
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <Link href='/about-us'>
            <a className={styles.view__all}>عرض مميزات وسام النجاح</a>
          </Link>
        </div>
        <div className={styles.success__content}>
          <div className={styles.success__content__container}>
            <div>
              {features_slides.length > 0 && (
                <Swiper
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  effect={'fade'}
                  modules={[Autoplay, EffectFade]}
                >
                  {features_slides?.map((slide, i) => (
                    <SwiperSlide key={i} className={styles.swiper__slider}>
                      <div className={styles.success__img}>
                        <Image
                          src={slide?.image}
                          alt={`background image - ${i}`}
                          layout='fill'
                          objectFit='cover'
                          objectPosition='center'
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <div className={styles.success__item}>
                <div className={styles.success__item__container}>
                  <h3 className={styles.success__item__title}>
                    {data[value]?.name}
                  </h3>
                  <div className={styles.success__item__content}>
                    <p className={styles.success__item__text}>
                      {data[value]?.content}
                    </p>
                    <AnimatedBtn text={data[value]?.name} url={'/about-us'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Success)
