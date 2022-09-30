import styles from './index.module.css'
import { BsFillStarFill } from 'react-icons/bs'
import { memo } from 'react'

const Testimonials = ({ data }) => {
  return (
    <div className={styles.testimonials} id='testimonials'>
      <div className={`${styles.container} container`}>
        {data?.map((person, i) => (
          <div className={styles.box} key={i}>
            <img src={person?.image} alt={person.name} />
            <h3>{person?.name}</h3>
            <span className={styles.title}>{person?.jobtitle}</span>
            <div className={styles.rate}>
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
            </div>
            <p>{person?.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Testimonials)
