import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { PDFDocument } from 'pdf-lib'

export default function ServicePage () {
  const router = useRouter()
  const { id } = router.query
  const [fields, setFields] = useState(['loading'])
  const [profileData, setProfileData] = useState({})

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

  const getForm = async () => {
    console.log('process.env+++', process.env.NEXT_PUBLIC_NEXTAUTH_URL)
    const formUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}aadhaar.pdf`
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(formPdfBytes)
    const form = pdfDoc.getForm()
    //const fields = form.getFields()
    console.log('profileData', profileData)
    form.getTextField('Text-ODjXylvMS3').setText(profileData.name)
    form.getTextField('Text-vroy5YIQGU').setText(profileData.address)

    // fields.forEach(field => {
    //   const type = field.constructor.name
    //   const name = field.getName()
    //   console.log(`${type}: ${name}`)
    // })
    form.flatten()
    const pdfBytes = await pdfDoc.save()
    const bytes = new Uint8Array(pdfBytes)
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const docUrl = URL.createObjectURL(blob)

    return window.open(docUrl)
  }

  useEffect(() => {
    const data = async () => {
      await getUSerData()
      await getServiceDetail()
    }
    data()
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
          onClick={async () => {
            getForm()
          }}
          disabled={fields[0] === 'loading'}
        >
          Print Pdf
        </button>
      </div>
    </main>
  )
}
