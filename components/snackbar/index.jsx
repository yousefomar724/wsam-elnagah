import styles from './index.module.css'
import { MdOutlineSmsFailed, MdOutlineDone } from 'react-icons/md'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Snackbar = forwardRef(({ message, type }, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true)
      setTimeout(() => {
        setShowSnackbar(false)
      }, 3000)
    },
  }))
  return (
    <div
      className={`${styles.snackbar} ${
        showSnackbar ? styles.show : styles.hide
      }`}
      style={{
        backgroundColor: type === 'success' ? '#00f593' : '#ff0033',
        color: type === 'success' ? '#333' : 'white',
      }}
    >
      <span className={styles.snackbar__icon}>
        {type === 'success' ? <MdOutlineDone /> : <MdOutlineSmsFailed />}
      </span>
      <p className={styles.snackbar__msg}>{message}</p>
    </div>
  )
})
Snackbar.displayName = 'Snackbar'
export default Snackbar
