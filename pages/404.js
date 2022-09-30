import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Page404 = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, [])
  return (
    <h1
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: '0',
        padding: '0',
      }}
    >
      Page 404
    </h1>
  )
}

export default Page404
