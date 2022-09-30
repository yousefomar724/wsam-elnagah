import { RiWhatsappLine } from 'react-icons/ri'
import { AiFillPhone } from 'react-icons/ai'
import styles from './index.module.css'
import { memo } from 'react'

const FixedBtn = ({ mobile, whatsup }) => {
  const message = `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة`
  return (
    <div className={styles.fixed__btns}>
      <a
        href={`tel:${mobile}`}
        target='_blank'
        title='تواصل معنا عبر الجوال'
        rel='noreferrer'
        className={`${styles.fixed__btn} ${styles.phone}`}
      >
        <AiFillPhone className={styles.fixed__btn__svg} />
      </a>
      <a
        href={`https://api.whatsapp.com/send?phone=${whatsup}&${message}`}
        target='_blank'
        title='تواصل معنا عبر واتساب'
        rel='noreferrer'
        className={`${styles.fixed__btn} ${styles.whats}`}
      >
        <RiWhatsappLine className={styles.fixed__btn__svg} />
      </a>
    </div>
  )
}

export default memo(FixedBtn)
