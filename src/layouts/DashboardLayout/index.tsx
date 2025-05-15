'use client'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useSidebar } from '@/context/SidebarContext'
import AppSidebar from '@/components/custom/AppSidebar'
import Backdrop from '@/components/custom/Backdrop'
import AppHeader from '@/components/custom/AppHeader'

interface IDashboardPageLayout {
  children: React.ReactNode
  p?: number
}

export default function DashboardLayout(props: IDashboardPageLayout) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar()
  const router = useRouter()
  const { logout, user } = useContext(AuthContext)
  const [isScrolled, setIsScrolled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [user])

  const mainContentMargin = isMobileOpen ? 'ml-0' : isExpanded || isHovered ? 'lg:ml-[275px]' : 'lg:ml-[90px]'

  return (
    <div className='flex min-h-screen bg-white'>
      <AppSidebar />
      <Backdrop />
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />
        <main className='flex-1 px-4 py-6 md:px-8 bg-gray-50 overflow-y-auto'>{props.children}</main>
      </div>
    </div>
  )
}
