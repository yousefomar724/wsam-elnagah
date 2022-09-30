import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import { GiRotaryPhone } from 'react-icons/gi'
import { TbGridDots } from 'react-icons/tb'
import { IoMdClose } from 'react-icons/io'
import { AiFillMobile } from 'react-icons/ai'
import {
  BsArrowLeft,
  BsSearch,
  BsWhatsapp,
  BsEnvelopeFill,
} from 'react-icons/bs'
import Menu from './menu'
import Link from 'next/link'

const Header = ({ settings, countries }) => {
  const router = useRouter()

  const [showHeader, setShowHeader] = useState(false) // to hide/show on scroll
  const [isScrollTop, setIsScrollTop] = useState(false) // to hide on scroll down, show on scroll up
  const [showMenu, setShowMenu] = useState(false) // to hide/show menu
  const [isSearch, setIsSearch] = useState(false) // to hide/show search page
  const [response, setResponse] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Show when scroll Up, Hide when scroll Down
  useEffect(() => {
    let lastScrollTop = window.scrollY
    window.addEventListener(
      'scroll',
      () => {
        if (lastScrollTop < window.scrollY) {
          setIsScrollTop(true)
        } else {
          setIsScrollTop(false)
        }
        lastScrollTop = window.scrollY
      },
      { passive: true }
    )
    return () =>
      removeEventListener(
        'scroll',
        () => {
          if (lastScrollTop < window.scrollY) {
            setIsScrollTop(true)
          } else {
            setIsScrollTop(false)
          }
          lastScrollTop = window.scrollY
        },
        { passive: true }
      )
  }, [])

  const onSearch = (event, searchTerm) => {
    event.preventDefault()
    setSearchTerm(searchTerm)
    if (
      countries?.find(({ name }) => name === searchTerm)?.name !== undefined
    ) {
      router.push(`/our-programs/${searchTerm}`)
      setSearchTerm('')
      setResponse('')
      setIsSearch(false)
    } else {
      setResponse(' لا توجد نتائج')
    }
  }
  return (
    <header
      className={`${styles.header} ${showHeader ? styles.active : ''} ${
        isScrollTop ? styles.hide : ''
      }`}
    >
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href='/'>
          <a>
            {settings?.logo && (
              <Image
                src={settings?.logo}
                alt='logo'
                width={102}
                height={70}
                layout='intrinsic'
                priority={true}
                className={styles.header__logo}
              />
            )}
          </a>
        </Link>

        {/* Header Icons */}
        {settings !== {} && (
          <div className={styles.header__icons}>
            <a
              href={`tel:${settings?.mobile}`}
              target='_blank'
              rel='noreferrer'
              className={styles.mobile}
            >
              <AiFillMobile title='تواصل معنا عبر الجوال' />
            </a>
            <a
              href={`tel:${settings?.phone}`}
              target='_blank'
              rel='noreferrer'
              className={styles.phone}
            >
              <GiRotaryPhone title='تواصل معنا عبر الهاتف الارضي' />
            </a>
            <a
              href={`mailto:${settings?.email}`}
              target='_blank'
              rel='noreferrer'
              className={styles.mail}
            >
              <BsEnvelopeFill title='تواصل معنا عبر البريد الالكتروني' />
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}`}
              target='_blank'
              rel='noreferrer'
              className={styles.whats}
            >
              <BsWhatsapp title='تواصل معنا عبر الواتساب' />
            </a>
          </div>
        )}

        {/* Menu */}
        <Menu
          setIsScrollTop={setIsScrollTop}
          setShowHeader={setShowHeader}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          isSearch={isSearch}
          settings={settings}
          isScrollTop={isScrollTop}
        />
        {/* Search Page */}
        <div
          className={
            isSearch
              ? `${styles.header__search__menu} ${styles.show__search}`
              : styles.header__search__menu
          }
        >
          <form
            onSubmit={(event) => onSearch(event, searchTerm)}
            className={styles.search__form}
          >
            <input
              type='text'
              placeholder='البحث'
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setResponse('')
              }}
              className={styles.search__input}
            />
            <button type='submit' className={styles.search__btn}>
              ابحث <BsArrowLeft />
            </button>
          </form>
          {isSearch && (
            <span
              className={styles.search__close}
              onClick={() => {
                setIsSearch(false)
                setResponse('')
              }}
            >
              <IoMdClose />
            </span>
          )}
          <div
            className={
              isSearch || showMenu
                ? styles.logo__container__menu__show
                : styles.logo__container__menu__hide
            }
          >
            {settings?.logo && (
              <Image
                src={settings?.logo}
                alt='logo'
                width={102}
                height={70}
                layout='intrinsic'
              />
            )}
          </div>
          <div className={styles.dropdown}>
            {countries
              ?.filter(
                ({ name }) =>
                  searchTerm &&
                  name.startsWith(searchTerm) &&
                  name !== searchTerm
              )
              .map(({ name }) => (
                <div
                  className={styles.dropdown__row}
                  key={name}
                  onClick={() => setSearchTerm(name)}
                >
                  {name}
                </div>
              ))}
          </div>
          <h2 style={{ color: 'black', zIndex: 4 }}>{response}</h2>
        </div>

        {/* Header End */}
        <div className={styles.header__end}>
          <span
            className={styles.header__search}
            onClick={() => setIsSearch(true)}
          >
            <BsSearch />
          </span>

          <span
            id='menuBtn'
            className={styles.header__menu__btn}
            onClick={() => setShowMenu(true)}
          >
            <span>القائمة</span> <TbGridDots />
          </span>
        </div>
      </nav>
    </header>
  )
}

export default memo(Header)
