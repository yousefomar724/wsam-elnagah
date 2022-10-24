import styles from "./index.module.css"
import { useState, useRef } from "react"
import TripesCard from "./tripesCard"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import Link from "next/link"
import { motion } from "framer-motion"
import { rightToLeftAnimation, topToBottomAnimation } from "../../animation"
import "swiper/css"
import "swiper/css/navigation"

const Tripes = ({ data: countries, settings }) => {
  const [value, setValue] = useState(0)
  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)
  const filteredCountries =
    value === 0
      ? countries
      : value === 1
      ? countries.filter((country) => country?.type === "out")
      : countries.filter((country) => country?.type === "in")

  const tripesTabs = ["جميع الوجهات", "الوجهات الخارجية", "الوجهات الداخلية"]
  return (
    <div className={styles.tripes}>
      <motion.h2
        className={styles.tripes__title}
        variants={topToBottomAnimation}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        اختر وجهتك الان
      </motion.h2>
      <div className={styles.tripes__container}>
        <motion.div
          className={styles.tripes__tabs}
          variants={rightToLeftAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {tripesTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setValue(i)}
              className={`${styles.tripes__tab} ${
                value === i ? styles.tripes__tab__active : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>
        {filteredCountries.length > 0 && (
          <Swiper
            slidesPerView={"auto"}
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
            className={styles.tripes__content}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = swiperPrevRef.current
              swiper.params.navigation.nextEl = swiperNextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            }}
          >
            {filteredCountries?.map((country) => (
              <SwiperSlide key={country.id} className={styles.tripes__slide}>
                <TripesCard item={country} settings={settings} />
              </SwiperSlide>
            ))}
            <div className={styles.swiper__prev} ref={swiperPrevRef}>
              <img src="/prev-arrow-gray.svg" alt="" />
            </div>
            <div className={styles.swiper__next} ref={swiperNextRef}>
              <img src="/next-arrow-gray.svg" alt="" />
            </div>
          </Swiper>
        )}
      </div>
      <Link href="/our-programs">
        <a className={styles.view__all}>عرض الكل</a>
      </Link>
    </div>
  )
}

export default Tripes
