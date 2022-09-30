import styles from './index.module.css'
import { BsArrowLeft } from 'react-icons/bs'
import Link from 'next/link'

const AnimatedBtn = ({ text, textColor, url, target }) => {
  return (
    <Link href={`${url}`}>
      <a className={styles.btn} target={target ? target : ''} rel='noreferrer'>
        <span className={styles.btn__text} style={{ color: `${textColor}` }}>
          {text}
        </span>
        <BsArrowLeft className={styles.btn__svg} />
      </a>
    </Link>
  )
}

export default AnimatedBtn
