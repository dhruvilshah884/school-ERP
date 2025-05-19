'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { AuthContext } from '@/context/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Menu, X, Bell, CircleUser, LogOut, Settings, ShieldQuestion } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Icon from '../../../public/images/logo.png'

const AppHeader: React.FC = () => {
  const { toggleSidebar, toggleMobileSidebar, isMobileOpen } = useSidebar()
  const { user, logout } = useContext(AuthContext)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleToggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar()
    } else {
      toggleMobileSidebar()
    }
  }
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return 'Good Morning'
    } else if (hour < 18) {
      return 'Good Afternoon'
    } else {
      return 'Good Evening'
    }
  }
  const greeting = getGreeting()

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-dark shadow-sm dark:border-gray-700 dark:bg-gray-900'>
      <div className='flex items-center justify-between px-4 py-3 lg:px-6'>
        {/* Left: Sidebar Toggle & Logo */}
        <div className='flex items-center gap-3'>
          <button
            onClick={handleToggleSidebar}
            className='p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden'
            aria-label='Toggle Sidebar'
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href='/'>
            <Image src={Icon as any} alt='Logo' width={50} height={32} className='hidden dark:block rounded-lg' />
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <h1 className='text-lg text-gray-600 dark:text-gray-300'>Welcome Back {user?.name}!!! {greeting}</h1>
            </div>
          </div>
        </div>

        


        {/* Right: Icons & Profile */}
        <div className='flex items-center gap-4'>
          {/* Notification */}
          <button className='relative rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800'>
            <Bell size={20} className='text-gray-600 dark:text-gray-300' />
            <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500'></span>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className='outline-none'>
              <Avatar>
                {/* <AvatarImage src={user?.image || '/images/default-user.png'} /> */}
                <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48 mr-4 mt-2 bg-dark-100 dark:bg-gray-800 rounded-lg shadow-lg'>
              <div className='px-3 py-2'>
                <p className='text-sm font-medium'>{user?.name}</p>
                <p className='text-xs text-gray-500'>{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CircleUser className='mr-2 h-4 w-4' />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShieldQuestion className='mr-2 h-4 w-4' />
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className='mr-2 h-4 w-4 text-red-500' />
                <span className='text-red-500'>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
