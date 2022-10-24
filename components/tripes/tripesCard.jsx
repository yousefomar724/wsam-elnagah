import styles from "./index.module.css"
import { BsArrowUpLeft } from "react-icons/bs"
import AnimatedBtn from "../animatedBtn"
import Image from "next/image"

const TripesCard = ({ item, settings }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__front}>
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className={styles.front__img}
          />
          <div className={styles.card__front__content}>
            <h3 className={styles.front__title}>{item.name}</h3>
            <BsArrowUpLeft className={styles.front__icon} />
          </div>
        </div>
        <div className={styles.card__back}>
          <Image
            src={settings?.logo}
            alt={`tripes logo ${item?.name}`}
            width={102}
            height={70}
            className={styles.back__logo}
          />
          <h3 className={styles.back__title}>{item.name}</h3>
          <div className={styles.card__btn}>
            <AnimatedBtn
              text="تفاصيل البرنامج"
              textColor="#07162d"
              url={`/${
                item?.country_for === "discounts" ? "sales" : "our-programs"
              }/${item?.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripesCard
