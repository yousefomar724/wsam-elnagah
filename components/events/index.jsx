import { memo, useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import { motion } from 'framer-motion'
import Snackbar from '../snackbar'
import {
  leftToRightAnimation,
  rightToLeftAnimation,
  topToBottomAnimation,
} from '../../animation'

const Events = ({ event }) => {
  const [formError, setFormError] = useState({})

  const [date, setDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const snackbarRef = useRef(null)

  const counter = () => {
    let countDownDate = new Date(event?.event_date).getTime()
    let dateNow = new Date().getTime()
    let dateDiff = countDownDate - dateNow
    const days = Math.floor(dateDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((dateDiff % (1000 * 60)) / 1000)
    if (dateDiff < 0) {
      setDate({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    }
    setDate({ days, hours, minutes, seconds })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      counter()
    }, 1000)
    return () => clearInterval(interval)
  }, [event?.event_date])

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      setFormError(validate(event.target.email.value))
      const endpoint =
        'https://elnagahtravels.com/backend/public/api/newsletters'

      // Form the request for sending data to the server.
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${event.target.email.value}`,
      }

      if (
        event.target.email.value &&
        /^\S+@\S+\.\S+$/.test(event.target.email.value)
      ) {
        const response = await fetch(endpoint, options)
        const result = await response.json()
        setSnackbarMsg(result?.message || result)
        snackbarRef.current.show()
        event.target.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const validate = (value) => {
    const errors = {}
    if (!value) {
      errors.email = 'هذا الحقل مطلوب'
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      errors.email = 'البريد الالكتروني غير صالح'
    }
    return errors
  }
  return (
    <div className={styles.events}>
      <motion.div
        className='dots dots-up'
        variants={rightToLeftAnimation}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
      ></motion.div>
      <motion.div
        className='dots dots-down'
        variants={leftToRightAnimation}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
      ></motion.div>
      <motion.h2
        className={styles.title}
        variants={topToBottomAnimation}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
      >
        أخر الأحداث
      </motion.h2>
      <div className='container'>
        <div className={styles.info}>
          <motion.div
            className={styles.time}
            variants={topToBottomAnimation}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
          >
            <div className={styles.unit}>
              <span className={styles.unit__firstSpan}>{date?.days || 0}</span>
              <span className={styles.unit__lastSpan}>يوم</span>
            </div>
            <div className={styles.unit}>
              <span className={styles.unit__firstSpan}>{date?.hours || 0}</span>
              <span className={styles.unit__lastSpan}>ساعة</span>
            </div>
            <div className={styles.unit}>
              <span className={styles.unit__firstSpan}>
                {date?.minutes < 10
                  ? `0${date?.minutes || 0}`
                  : date?.minutes || 0}
              </span>
              <span className={styles.unit__lastSpan}>دقيقة</span>
            </div>
            <div className={styles.unit}>
              <span className={styles.unit__firstSpan}>
                {date?.seconds < 10
                  ? `0${date?.seconds || 0}`
                  : date?.seconds || 0}
              </span>
              <span className={styles.unit__lastSpan}>ثانية</span>
            </div>
          </motion.div>
          <motion.h2
            className={styles.title}
            variants={leftToRightAnimation}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
          >
            {event?.title}
          </motion.h2>
          <motion.p
            className={styles.description}
            variants={rightToLeftAnimation}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
          >
            {event?.content}
          </motion.p>
        </div>
        <div className={styles.subscribe}>
          <form onSubmit={handleSubmit} className={styles.subscribe__form}>
            <div className={styles.form__field}>
              <input
                type='text'
                placeholder='ادخل البريد الالكتروني'
                name='email'
                className={styles.email__input}
                noValidate
              />
              <button type='submit' className={styles.submit__input}>
                اشترك
              </button>
            </div>
            <small style={{ color: 'red' }}>{formError?.email}</small>
          </form>
        </div>
      </div>
      <Snackbar ref={snackbarRef} message={snackbarMsg} type={'success'} />
    </div>
  )
}

export default memo(Events)
