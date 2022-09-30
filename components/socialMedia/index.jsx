import styles from './index.module.css'
import { BsSnapchat, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'
import { FaTiktok } from 'react-icons/fa'
import { memo } from 'react'

const SocialMedia = ({ settings }) => {
  return (
    <ul className={styles.container}>
      <li className={styles.instagram}>
        <a
          href={settings?.instagram}
          target='_blank'
          rel='noreferrer'
          aria-label='Fixed Link - Instagram'
        >
          <BsInstagram />
        </a>
      </li>
      <li className={styles.snapchat}>
        <a
          href={settings?.snapchat}
          target='_blank'
          rel='noreferrer'
          aria-label='Fixed Link - Snapchat'
        >
          <BsSnapchat />
        </a>
      </li>
      <li className={styles.tiktok}>
        <a
          href={settings?.tiktok}
          target='_blank'
          rel='noreferrer'
          aria-label='Fixed Link - Tiktok'
        >
          <FaTiktok />
        </a>
      </li>
      <li className={styles.twitter}>
        <a
          href={settings?.twitter}
          target='_blank'
          rel='noreferrer'
          aria-label='Fixed Link - Twitter'
        >
          <BsTwitter />
        </a>
      </li>
      <li className={styles.youtube}>
        <a
          href={settings?.youtube}
          target='_blank'
          rel='noreferrer'
          aria-label='Fixed Link - Youtube'
        >
          <BsYoutube />
        </a>
      </li>
    </ul>
  )
}

export default memo(SocialMedia)
