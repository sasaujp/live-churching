import React from 'react'
import { AppProps } from 'next/app'
import { Apollo } from '../client/providers'

const Provider = ({ Component, pageProps }: AppProps) => {
  return (
    <Apollo>
      <Component {...pageProps} />
    </Apollo>
  )
}
export default Provider
