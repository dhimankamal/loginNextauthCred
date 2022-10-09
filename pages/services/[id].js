import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

export default function ServicePage () {
  const router = useRouter()
  const { id } = router.query
  const [fields, setFields] = useState(['loading'])
  const getServiceDetail = async () => {
    try {
      const res = await fetch('/api/services/getSingleService', {
        method: 'POST',
        body: JSON.stringify({ id })
      })
      const data = await res.json()
      if (data && data.fields) {
        setFields(JSON.parse(data.fields))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [profileData, setProfileData] = useState({})

  const getUSerData = async () => {
    const getUserSession = await getSession()
    if (getUserSession) {
      try {
        const res = await fetch('/api/getUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(getUserSession?.user)
        })
        const data = await res.json()
        setProfileData(data)
        console.log('user data', data)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  useEffect(async () => {
    await getUSerData()
    getServiceDetail()
  }, [id])

  useEffect(() => {
    console.log(profileData, fields)
  }, [fields])
  return (
    <main className='w-screen text-center py-10'>
      <h2 className='text-2xl'>Service id = {id}</h2>
      <div className='py-10'>
        <ul className='text-xl space-y-4'>
          {fields &&
            fields.map(value => (
              <li key={value} className='capitalize'>
                {value} : {profileData[value]}
              </li>
            ))}
        </ul>
        <button
          className='bg-gray-700 px-10 py-4 rounded text-xl text-white font-bold my-10 disabled:opacity-50'
          onClick={() => alert('clicked')}
          disabled={fields[0] === 'loading'}
        >
          Print Pdf
        </button>
      </div>
    </main>
  )
}
