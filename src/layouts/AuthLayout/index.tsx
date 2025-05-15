import React from 'react'
import Image from 'next/image'

interface IAuthPageLayout {
  children: string
}

export default function AuthPageLayout(props: IAuthPageLayout) {
  return (
    <div className='flex h-screen flex-col lg:flex-row'>
      <div className='flex w-full items-center justify-center bg-background p-8 lg:w-[50%]'>{props.children}</div>
      <div className='relative hidden lg:flex w-full flex-col justify-center px-5 lg:w-[50%]'>
        <Image
          src='/images/welcome-banner.jpg'
          alt='Login cover'
          layout='fill'
          objectFit='cover'
          className='absolute inset-0'
        />
        <div className='absolute inset-0 bg-black opacity-75'></div>
        <div className='min-h-screen flex items-center justify-center bg-gray-900'>
          <div className='relative z-10 max-w-xl p-8 text-white'>
            <h1 className='mb-4 text-5xl font-bold'>Welcome to School ERP</h1>
            <p className='mb-6 text-xl'>
              Log in to access your account and explore our services. We're excited to have you back!
            </p>
            <blockquote className='border-l-4 border-white pl-4 italic'>
              The only way to do great work is to love what you do. - Steve Jobs
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
