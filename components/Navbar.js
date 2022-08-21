import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar () {
  const { data: session } = useSession()
  return (
    <>
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      />
      <link
        href='https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
        rel='stylesheet'
      />
      <nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <span className='font-semibold text-xl tracking-tight'>
            Online Form
          </span>
        </div>
        <div className='block lg:hidden'>
          <button
            className='flex items-center px-3 py-2 border rounded text-teal-100 border-teal-400 hover:text-white hover:border-white'
            id='navbar-btn'
          >
            <svg
              className='fill-current h-3 w-3'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>
        <div
          className='w-full block flex-grow lg:flex lg:items-center lg:w-auto '
          id='navbar'
        >
          <div className='text-sm lg:flex-grow  text-center lg:text-right'>
            <Link href={'/'}>
              <a
                className='block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4 text-lg'
              >
                Home 
              </a>
            </Link>
            <Link href={'/services'}>
              <a
                className='block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4 text-lg'
              >
                Services 
              </a>
            </Link>

            <button
              className={` uppercase text-sm font-bold tracking-wide text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150  ${
                session?.user?.accessToken ? 'bg-red-400' : 'bg-green-400'
              }`}
              onClick={() =>
                session?.user?.accessToken ? signOut() : signIn()
              }
            >
              {session?.user?.accessToken ? 'Sign Out' : 'Sign In as user'}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
