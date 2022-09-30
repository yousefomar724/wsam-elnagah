import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import ScrollDown from '../../components/scrollDown'
import Testimonials from '../../components/testimonials'
import styles from './index.module.css'

export const getStaticProps = async () => {
  try {
    const [reviewsRes, slidesRes] = await Promise.all([
      fetch('https://elnagahtravels.com/backend/public/api/reviews'),
      fetch(
        'https://elnagahtravels.com/backend/public/api/slides?page=reviews'
      ),
    ])
    const [
      { reviews = [] },
      {
        data: { slide = [] },
      },
    ] = await Promise.all([reviewsRes.json(), slidesRes.json()])
    return {
      props: { reviews, slide },
      revalidate: 60,
    }
  } catch (error) {
    console.log(error)
  }
}

const Thanks = ({ reviews, slide }) => {
  return (
    <Layout>
      <Head>
        <title>{slide[0]?.title}</title>
      </Head>
      <div className={styles.hero__bg}>
        {slide[0]?.image && (
          <Image src={slide[0]?.image} alt={slide[0]?.title} layout='fill' />
        )}
        <h1>{slide[0]?.title}</h1>
        <ScrollDown />
      </div>
      <Testimonials data={reviews} />
    </Layout>
  )
}

export default Thanks
