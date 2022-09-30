import styles from './index.module.css'
import { BsArrowUpLeft } from 'react-icons/bs'
import AnimatedBtn from '../animatedBtn'
import Image from 'next/image'

const TripesCard = ({ item, settings }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__front}>
          <Image
            src={item.image}
            alt={item.name}
            layout='fill'
            style={{ borderRadius: '20px', zIndex: '-1' }}
          />
          <div className={styles.card__front__content}>
            <h3>{item.name}</h3>
            <span>
              <BsArrowUpLeft />
            </span>
          </div>
        </div>
        <div className={styles.card__back}>
          <div className={styles.card__back__content}>
            <Image
              src={settings?.logo}
              alt={`tripes logo ${item?.name}`}
              width={102}
              height={70}
              style={{ marginTop: '1rem' }}
            />
            <h3>{item.name}</h3>
            <div className={styles.card__btn}>
              <AnimatedBtn
                text='تفاصيل البرنامج'
                textColor='#07162d'
                url={`/${
                  item?.country_for === 'discounts' ? 'sales' : 'our-programs'
                }/${item?.id}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripesCard
