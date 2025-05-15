import React from 'react'
import Login from './login'
import AuthPageLayout from '@/layouts/AuthLayout'

function Home() {
  return <Login />
}

Home.layout = AuthPageLayout
Home.isAuthRoute = true
export default Home
