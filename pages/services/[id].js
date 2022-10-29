import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { PDFDocument } from 'pdf-lib'
import { Formik, Field, ErrorMessage, Form } from 'formik'

export default function ServicePage () {
  const router = useRouter()
  const [error, setError] = useState(null)
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

  const getForm = async data => {
    console.log('process.env+++', process.env.NEXT_PUBLIC_NEXTAUTH_URL)
    const formUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}aadhaar.pdf`
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(formPdfBytes)
    const form = pdfDoc.getForm()
    //const fields = form.getFields()
    console.log('profileData', profileData)
    form.getTextField('Text-ODjXylvMS3').setText(data.fullname)
    form.getTextField('Text-vroy5YIQGU').setText(data.address)

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
    <main className='w-screen text-left py-10'>
      <div className='py-10'>
        <Formik
          initialValues={{
            fullname: '',
            address: ''
          }}
          onSubmit={async values => {
            console.log('values___', values)
            getForm(values)
          }}
        >
          <Form>
            <div className='bg-white flex flex-col items-center justify-center py-2 shadow-lg'>
              <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5'>
                <h2 className='text-2xl'>Service id = {id}</h2>
                <div className='text-red-400 text-md text-center rounded p-2'>
                  {error}
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='fullname'
                    className='uppercase text-sm text-gray-600 font-bold'
                  >
                    Name
                    <Field
                      name='fullname'
                      aria-label='enter your name'
                      aria-required='true'
                      type='text'
                      className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                    />
                  </label>

                  <div className='text-red-600 text-sm'>
                    <ErrorMessage name='fullname' />
                  </div>
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='fullname'
                    className='uppercase text-sm text-gray-600 font-bold'
                  >
                    Address
                    <Field
                      name='address'
                      aria-label='enter your name'
                      aria-required='true'
                      type='text'
                      className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                    />
                  </label>

                  <div className='text-red-600 text-sm'>
                    <ErrorMessage name='address' />
                  </div>
                </div>

                <div className='flex items-center justify-center'>
                  <button
                    type='submit'
                    className='uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150'
                  >
                    Print Now
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  )
}
