import AuthPageLayout from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function LoginPage() {
  const { login } = useContext(AuthContext)
  const [error, setError] = useState<string | null>(null)

  const { handleBlur, handleChange, handleSubmit, values, errors, touched, isSubmitting, isValid } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      setError(null)
      try {
        await login(values)
      } catch (err: any) {
        setError(err.message)
        console.error(error)
      } finally {
        setSubmitting(false)
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required')
    })
  })

  return (
    <div className='w-full max-w-sm space-y-6'>
      <div className='flex justify-center flex-col items-center gap-4'>
        <Image src='/images/logo.png' alt='Logo' width={64} height={64} />
        <span className=' space-y-2 font-bold text-xl'>School ERP</span>
      </div>
      <div className='space-y-2 text-center'>
        <h2 className='text-3xl font-bold'>Login</h2>
        <p className='text-muted-foreground'>Enter your credentials to access your account</p>
      </div>
      <form className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            name='email'
            value={values.email}
            id='email'
            placeholder='a@example.com'
            required
            type='email'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            value={values.password}
            name='password'
            placeholder='******'
            required
            type='password'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {error && <p className='text-center text-red-500 font-semibold mt-2'>{error}</p>}
        <Button
          className='w-full'
          type='submit'
          disabled={!isValid || isSubmitting}
          onClick={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          {isSubmitting ? 'Loading...' : 'Login'}
        </Button>
      </form>
      <div className='text-center text-sm'>
        <Link className='underline' href='/forgot-password'>
          Forgot password?
        </Link>
      </div>
      <div className='text-center text-sm'>
        Dont have an account?{' '}
        <Link className='underline' href='/sign-up'>
          Sign up
        </Link>
      </div>
    </div>
  )
}

LoginPage.layout = AuthPageLayout
LoginPage.isAuthRoute = true
