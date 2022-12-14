import { useState, useEffect } from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import { useSession, getSession } from 'next-auth/react'
import * as React from 'react'
import toast from '../components/toast'

export default function Add () {
  const notify = React.useCallback((type, message) => {
    toast({ type, message })
  }, [])
  const [error, setError] = useState(null)
  const { data: session } = useSession()

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

  useEffect(() => {
    getUSerData()
  }, [])

  if (session && profileData?.id) {
    return (
      <>
        <div className='bg-white'>
          <Formik
            initialValues={{
              fullname: `${profileData?.name}`,
              gender: '',
              placeOfBirth: '',
              age: ''
            }}
            onSubmit={async values => {
              console.log('values___', values)
              try {
                let res = await fetch('./api/updateUserData', {
                  method: 'POST',
                  body: JSON.stringify({ id: session.user.accessToken, values })
                })
                notify('success', 'Success update!')
                console.log('responsed', res)
              } catch (error) {
                notify('error', 'Error!')
                console.log('error', error)
              }
            }}
          >
            <Form>
              <div className='bg-white flex flex-col items-center justify-center min-h-screen py-2 shadow-lg'>
                <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5'>
                  <h1 className='text-3xl'>
                    Add Data here user id - {session.user.accessToken}
                  </h1>

                  <div className='text-red-400 text-md text-center rounded p-2'>
                    {error}
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='fullname'
                      className='uppercase text-sm text-gray-600 font-bold'
                    >
                      Full Name
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
                  <div className='mb-6'>
                    <label
                      htmlFor='gender'
                      className='uppercase text-sm text-gray-600 font-bold'
                    >
                      Gender
                      <Field
                        name='gender'
                        aria-label='Select Gender'
                        aria-required='true'
                        as='select'
                        className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                      >
                        <option value='select' defaultValue>
                          Select
                        </option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                      </Field>
                    </label>

                    <div className='text-red-600 text-sm'>
                      <ErrorMessage name='gender' />
                    </div>
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='placeOfBirth'
                      className='uppercase text-sm text-gray-600 font-bold'
                    >
                      Place of Birth
                      <Field
                        name='placeOfBirth'
                        aria-label='enter your name'
                        aria-required='true'
                        type='text'
                        className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                      />
                    </label>

                    <div className='text-red-600 text-sm'>
                      <ErrorMessage name='placeOfBirth' />
                    </div>
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='age'
                      className='uppercase text-sm text-gray-600 font-bold'
                    >
                      Age
                      <Field
                        name='age'
                        aria-label='enter your name'
                        aria-required='true'
                        type='number'
                        className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                      />
                    </label>

                    <div className='text-red-600 text-sm'>
                      <ErrorMessage name='age' />
                    </div>
                  </div>

                  <div className='flex items-center justify-center'>
                    <button
                      type='submit'
                      className='uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150'
                    >
                      Update Now
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </>
    )
  } else {
    return <>Loading</>
  }
}
