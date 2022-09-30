import styles from './index.module.css'
import React, { memo, useState } from 'react'
import Image from 'next/image'
import AnimatedBtn from '../animatedBtn'

const About = ({ data }) => {
  const [value, setValue] = useState(0)
  const imgs = data.map((img) => img.image)
  return (
    <div className={styles.about}>
      <div className={styles.about__container}>
        <div className={styles.about__container__top}>
          <h2 className={styles.about__title}>عن وسام النجاح</h2>
          {/* tabs */}
          <div className={styles.about__tabs}>
            {data.map((tab, i) => (
              <button
                key={i}
                onClick={() => setValue(i)}
                className={`${styles.about__tab} ${
                  value === i ? styles.about__tab__active : ''
                }`}
              >
                {tab?.title}
              </button>
            ))}
          </div>
        </div>
        {/* Content */}
        {imgs.map((img, i) => (
          <div
            key={i}
            style={{
              zIndex: '-1',
            }}
          >
            {value === i && (
              <Image
                src={img}
                alt={`background image ${i}`}
                className={styles.about__img}
                layout='fill'
              />
            )}
          </div>
        ))}
        {/* Filter content based on tabs */}
        <div className={styles.about__item}>
          <div className={styles.about__item__container}>
            <h3 className={styles.about__item__title}>
              {data[value]?.subtitle}
            </h3>
            <div className={styles.about__item__content}>
              <p className={styles.about__item__text}>{data[value]?.content}</p>
              <AnimatedBtn text={data[value]?.title} url={'/contact-us'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(About)
