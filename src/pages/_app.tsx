'use client'
import AuthProvider from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import { SidebarProvider } from '@/context/SidebarContext'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // Enable retry in production
      retry: process.env.NODE_ENV === 'production'
    }
  }
})

export default function App({ Component, pageProps }: any) {
  const Layout = Component.layout || (({ children }: any) => <>{children}</>)
  const isSecureRoute = Component.isSecureRoute || false
  const isAuthRoute = Component.isAuthRoute || false
  const isPublicRoute = Component.isPublicRoute || false

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AuthProvider isAuthRoute={isAuthRoute} isPublicRoute={isPublicRoute} isSecureRoute={isSecureRoute}>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </SidebarProvider>
    </QueryClientProvider>
  )
}
