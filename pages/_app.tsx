import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useState} from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [ auth, setAuth ] = useState({
    user: '',
    token: ''
  })


  const authenticateUser = (res: any) => {
    const { username, token } = res
    setAuth({ user: username, token })
  }
  return <Component {...pageProps} 
    authenticateUser={(authenticateUser)}
    auth={auth}
  />

}

export default MyApp
