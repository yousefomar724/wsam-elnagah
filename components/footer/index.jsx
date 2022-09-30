import styles from './index.module.css'
import {
  BsSnapchat,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsPhoneFill,
  BsEnvelopeFill,
  BsWhatsapp,
} from 'react-icons/bs'
import { RiArrowUpFill } from 'react-icons/ri'
import { FaTiktok } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { BiSupport } from 'react-icons/bi'
import { GiRotaryPhone } from 'react-icons/gi'
import { motion } from 'framer-motion'
import { footerBottomToTop, footerTopToBottom } from '../../animation'
import Image from 'next/image'
import { memo } from 'react'

const Footer = ({ settings, countries }) => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.up__section}>
        <motion.div
          className={styles.famous__places}
          variants={footerTopToBottom}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
        >
          <h3 className={styles.title}>أشهر الوجهات السياحية</h3>
          {countries
            ?.filter((c) => c.country_for === 'programs')
            ?.slice(0, 7)
            .map((country) => (
              <span key={country?.id} className={styles.famous__places__span}>
                <Link href={`/our-programs/${country?.id}`}>
                  <a className={styles.famous__places__link}>
                    <IoIosArrowBack />
                    {country?.name}
                  </a>
                </Link>
              </span>
            ))}
        </motion.div>
        <motion.div
          className={styles.call__us}
          variants={footerBottomToTop}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
        >
          <h3 className={styles.title}>اتصل بنا</h3>
          <div className={styles.call__us__head}>
            <BiSupport />
            للحجز والاستفسار
          </div>
          <span className={styles.call__us__span}>فضلا الإتصال على</span>
          <div className={styles.call__us__container}>
            <a
              href={`mailto:${settings?.email}`}
              target='_blank'
              rel='noreferrer'
              className={styles.contact__link}
            >
              <BsEnvelopeFill /> {settings?.email}
            </a>
            <a
              href={`tel:${settings?.phone}`}
              target='_blank'
              rel='noreferrer'
              className={styles.contact__link}
            >
              <GiRotaryPhone /> {settings?.phone}
            </a>
            <a
              href={`tel:${settings?.mobile}`}
              target='_blank'
              rel='noreferrer'
              className={styles.contact__link}
            >
              <BsPhoneFill /> {settings?.mobile}
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}`}
              target='_blank'
              rel='noreferrer'
              className={styles.contact__link}
            >
              <BsWhatsapp /> {settings?.whatsup}
            </a>
          </div>
          <span className={styles.call__us__span}>
            حتى نتمكن من خدمتكم بشكل أفضل
          </span>
        </motion.div>
        <motion.div
          className={styles.location}
          variants={footerTopToBottom}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
        >
          <h3 className={styles.title}>موقعنا</h3>
          {settings?.address}
          {settings?.latitude && settings?.longitude && (
            <iframe
              src={`https://maps.google.com/maps?q=${settings?.latitude},${settings?.longitude}&zoom=15&hl=es;&output=embed`}
              width='260px'
              height='280px'
              style={{ border: 'none', marginTop: '.5rem' }}
              allowFullScreen=''
              loading='lazy'
              title='footer map saudi arabia'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          )}
        </motion.div>
        <motion.div
          className={styles.social}
          variants={footerBottomToTop}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
        >
          <h3 className={styles.title}>تابعنا علي</h3>
          <div className={styles.social__icons}>
            <a
              href={settings?.instagram}
              target='_blank'
              rel='noreferrer'
              className={styles.instagram}
              aria-label='Footer Link - Instagram'
            >
              <BsInstagram />
            </a>
            <a
              href={settings?.tiktok}
              target='_blank'
              rel='noreferrer'
              className={styles.tiktok}
              aria-label='Footer Link - Tiktok'
            >
              <FaTiktok />
            </a>
            <a
              href={settings?.twitter}
              target='_blank'
              rel='noreferrer'
              className={styles.twitter}
              aria-label='Footer Link - Twitter'
            >
              <BsTwitter />
            </a>
            <a
              href={settings?.snapchat}
              target='_blank'
              rel='noreferrer'
              className={styles.snapchat}
              aria-label='Footer Link - Snapchat'
            >
              <BsSnapchat />
            </a>
            <a
              href={settings?.youtube}
              target='_blank'
              rel='noreferrer'
              className={styles.youtube}
              aria-label='Footer Link - Youtube'
            >
              <BsYoutube />
            </a>
          </div>
        </motion.div>
        {settings?.logo && (
          <Link href='/'>
            <a className={styles.f__logo}>
              <Image
                src={settings?.logo}
                width={145}
                height={100}
                layout='intrinsic'
                alt='wsam elnagah logo'
              />
            </a>
          </Link>
        )}
        <button
          onClick={scrollToTop}
          title='ارجع الي الاعلي'
          className={styles.scroll__top__btn}
        >
          <RiArrowUpFill />
        </button>
      </div>

      <p className={styles.copyright}>
        <span className={styles.copyright__text}>{settings?.copy_rights}</span>
        <span className={styles.copyright__msg}>
          Made with <AiFillHeart /> in Elnagah
        </span>
      </p>
    </footer>
  )
}

export default memo(Footer)
