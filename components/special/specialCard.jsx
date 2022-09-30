import styles from './index.module.css'
import { BsArrowLeft } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'

const SpecialCard = ({ item, settings }) => {
  const message = `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة`
  return (
    <Link href={`/special-offers/${item.id}`} passHref>
      <div className={styles.card}>
        <Image
          src={item?.image}
          layout='fill'
          objectFit='fill'
          objectPosition='center'
          alt={item?.id}
          className={styles.card__img}
        />
        <div className={styles.card__content}>
          <Link href={`/special-offers/${item.id}`}>
            <a className={styles.card__btn}>
              التفاصيل
              <BsArrowLeft className={styles.card__btn__icon} />
            </a>
          </Link>
          <a
            className={styles.card__btn}
            href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}&${message}`}
            target='_blank'
            rel='noreferrer'
          >
            حجر العرض
            <BsArrowLeft className={styles.card__btn__icon} />
          </a>
        </div>
      </div>
    </Link>
  )
}

export default SpecialCard
