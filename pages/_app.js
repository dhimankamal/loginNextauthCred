import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
