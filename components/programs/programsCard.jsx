import styles from './index.module.css'
import { BsArrowUpLeft, BsArrowLeft, BsFillCircleFill } from 'react-icons/bs'
import AnimatedBtn from '../animatedBtn'
import Image from 'next/image'

const ProgramsCard = ({ country, settings }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__front}>
          <div className={styles.sale}>
            <div className={styles.sale__container}>
              <p className={styles.sale__content}>
                <span>{country?.discount}</span> %
              </p>
              <span className={styles.discount__text}>خصم</span>
            </div>
          </div>
          {country?.image && (
            <Image
              src={country?.image}
              alt={country?.name}
              style={{ borderRadius: '20px', zIndex: '-1' }}
              layout='fill'
              priority={true}
            />
          )}
          <div className={styles.card__front__content}>
            <h3 className={styles.card__front__title}>{country?.name}</h3>
            <span className={styles.card__front__icon}>
              <BsArrowUpLeft />
            </span>
          </div>
        </div>
        <div className={styles.card__back}>
          <div className={styles.card__back__content}>
            {settings?.logo && (
              <Image
                src={settings?.logo}
                alt={`programs logo ${country?.name}`}
                width={102}
                height={70}
              />
            )}
            <h3 className={styles.card__back__title}>
              {country?.name} <BsArrowLeft />
            </h3>
            <p>
              <span>
                <BsFillCircleFill />
                {country?.category?.name}
              </span>
            </p>
            <p>
              <span>
                <BsFillCircleFill />
                سعر البرنامج
              </span>
              <span> {country?.price_after_discount}</span> ريال سعودي
            </p>
            <p
              style={{
                display: 'flex',
                justifyContent: ' flex-start',
                alignItems: 'center',
              }}
            >
              <span>
                <BsFillCircleFill />
                بدلا من
              </span>
              <span style={{ textDecoration: 'line-through' }}>
                {country?.price}
              </span>
            </p>
            <p className={styles.offer}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                <path d='m30.718 13.042.002-9.522a2.243 2.243 0 0 0-2.24-2.24l-9.52.002-.402-.002c-.83 0-1.62.048-2.19.618L1.822 16.442a1.83 1.83 0 0 0-.542 1.308c0 .495.192.96.542 1.308l11.12 11.12c.348.35.813.542 1.308.542.492 0 .96-.192 1.308-.542l14.544-14.546c.626-.622.62-1.52.618-2.384l-.002-.206zM24.96 8.96a1.92 1.92 0 1 1 .001-3.841 1.92 1.92 0 0 1-.001 3.841z'></path>
              </svg>
              وفر:
              <span>{country?.price - country?.price_after_discount}</span>
              ريال سعودي
            </p>
            <AnimatedBtn
              text='تفاصيل البرنامج'
              textColor='#07162d'
              url={`/sales/${country?.country?.id}/${country?.category?.id}/${country?.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramsCard
