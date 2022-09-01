import React from 'react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function Services ({ services }) {
  const dataApi = async () => {
    try {
      const data = await fetch('/api/services')
      const names = await data.json()

      console.log('test', names)
    } catch (error) {
      console.log('error', error)
    }
  }
  dataApi()
  return (
    <>
      <div className='mx-40 my-10'>
        <h1 className='text-4xl font-bold mb-2 text-gray-800'>Service List</h1>
        <div className='grid gap-4'>
          {services &&
            services.map(data => (
              <div key={data.id} className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold mb-2 text-gray-800'>
                  {data.title}
                </h2>
                <p className='text-gray-700'>{data.text}</p>
                <button
                  className={`mt-4 uppercase text-sm font-bold tracking-wide text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150 
              bg-green-400
           `}
                >
                  Apply Now
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const services = await prisma.services.findMany()
  return { props: { services } }
}
