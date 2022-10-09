import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ServicePage () {
  const router = useRouter()
  const { id } = router.query

  const getServiceDetail = async () => {
    try {
      const res = await fetch('/api/services/getSingleService', {
        method: 'POST',
        body: JSON.stringify({id})
      }) 
      const data = await res.json()

      console.log("res", data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getServiceDetail()
  }, [id])
  return (
    <main className='w-screen text-center py-10'>
      <h2 className='text-2xl'>Id = {id}</h2>
      <div className='py-10'>
        <ul className='text-xl space-y-4'>
          <li>Name : kamal</li>
          <li>Test : Test 2</li>
          <li>Test : Test 2</li>
          <li>Test : Test 2</li>
          <li>Test : Test 2</li>
          <li>Test : Test 2</li>
          <li>Test : Test 2</li>
        </ul>
        <button
          className='bg-gray-700 px-10 py-4 rounded text-xl text-white font-bold my-10'
          onClick={() => alert('clicked')}
        >
          Print Pdf
        </button>
      </div>
    </main>
  )
}
