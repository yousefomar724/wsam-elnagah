import Header from '../header'
import Footer from '../footer'
// import { motion, useScroll, useSpring } from 'framer-motion'
import FixedBtn from '../fixedBtn'
import SocialMedia from '../socialMedia'
import { memo, useEffect, useState } from 'react'

const Layout = ({ children }) => {
  // const { scrollYProgress } = useScroll()
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001,
  // })

  const [countries, setCountries] = useState([])
  const [settings, setSettings] = useState({})
  const fetchData = async () => {
    try {
      const [programsRes, settingsRes] = await Promise.all([
        fetch('https://elnagahtravels.com/backend/public/api/countries'),
        fetch('https://elnagahtravels.com/backend/public/api/settings'),
      ])
      const [{ countries = [] }, { settings = {} }] = await Promise.all([
        programsRes.json(),
        settingsRes.json(),
      ])
      setCountries(countries)
      setSettings(settings)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* <motion.div className='progress-bar' style={{ scaleX }} /> */}
      <Header settings={settings} countries={countries} />
      {children}
      <FixedBtn mobile={settings?.mobile} whatsup={settings?.whatsup} />
      <SocialMedia settings={settings} />
      <Footer settings={settings} countries={countries} />
    </div>
  )
}

export default memo(Layout)
