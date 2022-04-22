import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect} from "react";
import {firebaseCloudMessaging} from "../config/firebase";

function MyApp({ Component, pageProps }: AppProps) {



  useEffect(() => {
    setToken()
    // this is working
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => console.log('event for the service worker', event))
    }
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init()
        if (token) {
          console.log('token', token)
          // not working
          await firebaseCloudMessaging.getMessage()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }, [])


  return <Component {...pageProps} />
}

export default MyApp
