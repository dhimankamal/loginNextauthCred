import Head from 'next/head'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home () {
  const { data: session } = useSession()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold'>
          Welcome to{' '}
          <a className='text-blue-600' href='https://nextjs.org'>
            Online Form
          </a>
        </h1>

        <div className='mt-10'>
          <button
            className={`mt-10 uppercase text-sm font-bold tracking-wide text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150  ${
              session?.user?.accessToken ? 'bg-red-400' : 'bg-green-400'
            }`}
            onClick={() => (session?.user?.accessToken ? signOut() : signIn())}
          >
            {session?.user?.accessToken ? 'Sign Out' : 'Sign In as user'}
          </button>
        </div>
      </main>
    </div>
  )
}
