import React, { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'

export default function Profile () {
  const { data: session } = useSession()

  const [profileData, setProfileData] = useState({})

  console.log('session', session)

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

  useEffect(() => {
    getUSerData()
  }, [])

  let data = [
    {
      title: 'Name',
      value: profileData?.name || '-'
    },
    {
      title: 'Email',
      value: profileData?.email || '-'
    },
    {
      title: 'Gender',
      value: profileData?.gender || '-'
    },
    {
      title: 'Date of birth',
      value: profileData?.dob || '-'
    },
    {
      title: 'Place of birth',
      value: profileData?.placeOfBirth || '-'
    },
    {
      title: 'Age',
      value: profileData?.age || '-'
    },
    {
      title: 'Father name',
      value: profileData?.fatherName || '-'
    },
    {
      title: 'Mother name',
      value: 'test'
    },
    {
      title: 'Address',
      value: '---'
    }
  ]
  return (
    <div className='m-10'>
      <table className='table-auto mx-auto text-left'>
        <thead className='text-2xl'>
          <tr>
            <th className='pr-10'>Detail</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele, index) => (
            <tr key={index}>
              <td className='py-4'>{ele.title}</td>
              <td className='py-4'>{ele.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
