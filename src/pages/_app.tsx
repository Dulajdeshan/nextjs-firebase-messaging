import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect, useState} from "react";
import {firebaseCloudMessaging} from "../config/firebase";

function MyApp({ Component, pageProps }: AppProps) {

  const [fcmToken, setFcmToken] = useState<string|undefined>(undefined);

  const getToken = async () => {
    try {
      const token = await firebaseCloudMessaging.init()
      if (token) {
        await firebaseCloudMessaging.getMessage()
        setFcmToken(token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => console.log('event for the service worker', event))
    }
    async function setToken() {
      await getToken()
    }
    setToken()
  }, [])


  return <Component {...pageProps} fcmToken={fcmToken} getToken={getToken}/>
}

export default MyApp
