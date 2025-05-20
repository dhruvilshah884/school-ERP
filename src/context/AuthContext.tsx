import {
  fetchCurrentUser ,
  CommonLogin,
  CommonSignup
} from '@/api-handlers/auth'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { IAuthUser  } from '@/interface/AuthUser'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

interface IAuthContext {
  user: IAuthUser  | null
  authLoading: boolean
  login: (data: any) => Promise<void>
  signup: (data: any) => Promise<void>
  logout: () => Promise<void>
  refetch: () => Promise<void>
}

interface IAuthContextProvider {
  children: React.ReactNode
  isSecureRoute?: boolean
  isPublicRoute?: boolean
  isAuthRoute?: boolean
}

const defaultProviderValue: IAuthContext = {
  user: null,
  authLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  refetch: async () => {}
}

const AuthContext = createContext<IAuthContext>(defaultProviderValue)

export default function AuthProvider(props: IAuthContextProvider) {
  const router = useRouter()
  const [user, setUser ] = useState<IAuthUser  | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  const userDefaultRedirection = (userData: IAuthUser ) => {
    // Uncomment below if email verification check is needed
    // if (!userData?.isVerified) return router.push('/otp-verification')
    return router.push('/dashboard')
  }

  const { mutateAsync: handleSignup } = useMutation(CommonSignup, {
    onSuccess: (data: any) => {
      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account.'
      })

      const accessToken = data.data?.token
      const userData = data.data?.user

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      }

      setUser (userData)
      userDefaultRedirection(userData)
    },
    onError: (error: any) => {
      toast({
        title: 'Signup Error',
        description: error?.response?.data?.error || 'An error occurred during signup'
      })
    }
  })

  const { mutateAsync: handleLogin } = useMutation(CommonLogin, {
    onSuccess: (data: any) => {
      toast({
        title: 'Login successful',
        description: 'You have successfully logged in.'
      })

      const accessToken = data?.token || data?.data?.token || data?.user?.token
      const userData = data?.user || data?.data?.user

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      }

      setUser (userData)
      userDefaultRedirection(userData)
    },
    onError: (error: any) => {
      toast({
        title: 'Login Error',
        description: error?.response?.data?.error || 'An error occurred during login'
      })
    }
  })

  const { mutateAsync: handleRefetchUser  } = useMutation(fetchCurrentUser , {
    onSuccess: (data: any) => {
      const accessToken = data?.token || data?.data?.token || data?.user?.token
      const userData = data?.user || data?.data?.user
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      }
      
      setUser (userData)
      setAuthLoading(false)
    },
    onError: (error: any) => {
      console.log('Refetch user error:', error)
      setAuthLoading(false)
      setUser  (null)
      localStorage.removeItem('accessToken')
      router.push('/login')
    }
  })

  const signup = async (data: any) => {
    setAuthLoading(true)
    await handleSignup(data)
    setAuthLoading(false)
  }

  const login = async (data: any) => {
    setAuthLoading(true)
    await handleLogin(data)
    setAuthLoading(false)
  }

  const logout = async () => {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common['Authorization']
    setUser  (null)
    router.push('/login')
  }

  const refetchUser  = async () => {
    setAuthLoading(true)
    await handleRefetchUser ()
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      handleRefetchUser ()
    } else {
      setAuthLoading(false)
      setUser  (null)
    }
  }, [])

  useEffect(() => {
    if (!authLoading) {
      if (props.isAuthRoute && user) {
        userDefaultRedirection(user)
      }

      if (props.isSecureRoute && !user) {
        router.push('/login')
      }
    }
  }, [props.isSecureRoute, props.isAuthRoute, props.isPublicRoute, authLoading, user])

  if (authLoading) {
      return (
        <div className="container mx-auto p-4 max-w-5xl">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        authLoading,
        refetch: refetchUser 
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext }