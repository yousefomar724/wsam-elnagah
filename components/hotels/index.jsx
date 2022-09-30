import styles from './index.module.css'
import { memo, useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MdLocationOn } from 'react-icons/md'
import 'swiper/css'
import 'swiper/css/pagination'

const Hotels = ({ hotels, settings }) => {
  const countries = hotels
    ?.filter(
      (hotel, pos, arr) =>
        arr.findIndex(
          (hotel2) => hotel2?.country?.name === hotel?.country?.name
        ) === pos
    )
    .map((hotel) => hotel?.country)
    .reverse()
  const hotelsTabs = ['كل الفنادق', 'الفنادق الداخلية', 'الفنادق الخارجية']
  const [value, setValue] = useState(0)
  const [value2, setValue2] = useState('')
  useEffect(() => {
    setValue2(countries[0]?.name)
  }, [countries[0]?.name])

  return (
    <div className={styles.hotels} id='hotels'>
      <div className={styles.hotels__container}>
        <div className={styles.hotels__heading}>
          <h2 className={styles.hotels__title}> أشهر فنادق</h2>
          <ul className={styles.hotels__tabs}>
            {hotelsTabs?.map((tab, i) => (
              <button
                key={i}
                onClick={() => setValue(i)}
                className={`${styles.hotels__tab} ${
                  value === i ? styles.hotels__tab__active : ''
                }`}
              >
                {tab}
              </button>
            ))}
          </ul>
        </div>
        <div className={styles.hotels__content}>
          <div className={styles.hotels__list}>
            {countries
              ?.filter((c) =>
                value === 1
                  ? c.type === 'in'
                  : value === 2
                  ? c.type === 'out'
                  : c
              )
              .map((country) => (
                <div
                  className={styles.hotels__list__item}
                  key={country?.id}
                  onClick={() => setValue2(country?.name)}
                >
                  <Image
                    width={60}
                    height={60}
                    className={styles.hotels__list__img}
                    src={country?.image}
                    alt={country?.name}
                  />
                  <p>{country?.name}</p>
                </div>
              ))}
          </div>
          <div className={styles.hotels__grid}>
            {hotels
              .filter((hotel) => hotel?.country?.name === value2)
              .map((hotel) => (
                <a
                  href={`https://api.whatsapp.com/send?phone=${settings?.mobile}`}
                  target='_blank'
                  rel='noreferrer'
                  key={hotel?.id}
                >
                  <div className={styles.hotels__card}>
                    <Image
                      layout='fill'
                      src={hotel?.image}
                      alt={hotel?.name}
                      className={styles.hotels__card__img}
                    />
                    <div>
                      <h3>{hotel?.name}</h3>
                      <p>
                        {hotel?.country?.name}
                        <MdLocationOn />
                      </p>
                    </div>
                  </div>
                </a>
              ))}
          </div>
          <div className={styles.hotels__grid__mobile}>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={10}
              dir='rtl'
              className={styles.swiper}
            >
              {hotels
                ?.filter((hotel) => hotel?.country?.name === value2)
                .map((hotel) => (
                  <SwiperSlide
                    key={hotel?.image}
                    className={styles.hotels__card}
                  >
                    <a
                      href={`https://api.whatsapp.com/send?phone=${settings?.mobile}`}
                      target='_blank'
                      rel='noreferrer'
                      style={{ width: '100%', height: '100%' }}
                    >
                      <Image
                        layout='fill'
                        src={hotel?.image}
                        alt={hotel?.name}
                        className={styles.hotels__card__img}
                      />
                      <div>
                        <h3>{hotel?.name}</h3>
                        <p>
                          {hotel?.country?.name}
                          <MdLocationOn />
                        </p>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Hotels)
