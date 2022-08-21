import React from 'react'

export default function Services () {
  return (
    <>
      <div className='mx-40 my-10'>
        <h1 className='text-4xl font-bold mb-2 text-gray-800'>Service List</h1>
        <div className='grid gap-4'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-2 text-gray-800'>
              Card with no image
            </h2>
            <p className='text-gray-700'>This is my cool new card!</p>
            <button
              className={`mt-4 uppercase text-sm font-bold tracking-wide text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150 
              bg-green-400
           `}
            >
              Apply Now
            </button>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-2 text-gray-800'>
              Card with no image
            </h2>
            <p className='text-gray-700'>This is my cool new card!</p>
            <button
              className={`mt-4 uppercase text-sm font-bold tracking-wide text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150 
              bg-green-400
           `}
            >
              Apply Now
            </button>
          </div>
         
        </div>
      </div>
    </>
  )
}
