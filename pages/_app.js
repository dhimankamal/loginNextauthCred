import 'tailwindcss/tailwind.css'
import { SessionProvider } from 'next-auth/react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NextNProgress from 'nextjs-progressbar'

function MyApp ({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextNProgress />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  )
}

export default MyApp
