import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import AnimatedBtn from '../animatedBtn'
import styles from './index.module.css'

const NewPrograms = ({ programs, settings }) => {
  const message = (id) => {
    const program = programs.find((p) => p.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }
  return (
    <div className={styles.newPrograms__container}>
      <h2 className={styles.newPrograms__title}>أحدث البرامج السياحية</h2>
      <div className={styles.newPrograms__cards}>
        {programs.slice(0, 3).map((program) => (
          <div className={styles.newPrograms__card} key={program.id}>
            <div className={styles.newPrograms__img__container}>
              <Image
                src={program.image}
                alt={program.title}
                layout='fill'
                className={styles.newPrograms__card__img}
              />
            </div>
            <div className={styles.newPrograms__card__content}>
              <div className={styles.newPrograms__card__period}>
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
                  {program.country.name}
                </span>
              </div>
              <div className={styles.newPrograms__heading}>
                <Link
                  href={`/our-programs/${program.country.id}/${program.category.id}/${program.id}`}
                >
                  <a>
                    <h3 className={styles.newPrograms__card__title}>
                      {program.title} {program.rate} نجوم
                    </h3>
                  </a>
                </Link>
                <div className={styles.stars}>
                  {Array.from(Array(program.rate)).map((s, i) => (
                    <AiFillStar key={i} />
                  ))}
                </div>
              </div>
              <div className={styles.newPrograms__card__price}>
                <span className={styles.new__price}>
                  {program.price_after_discount}
                </span>{' '}
                ريال سعودي
              </div>
              <div className={styles.newPrograms__card__btns}>
                <AnimatedBtn
                  text='تفاصيل العرض'
                  textColor='#222'
                  url={`/our-programs/${program.country.id}/${program.category.id}/${program.id}`}
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
        ))}
      </div>
    </div>
  )
}

export default memo(NewPrograms)
