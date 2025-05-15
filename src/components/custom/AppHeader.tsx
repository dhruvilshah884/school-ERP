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
import {
  Menu,
  X,
  Bell,
  CircleUser,
  LogOut,
  Settings,
  ShieldQuestion
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900'>
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
            <Image
              src='/images/logo/logo.svg'
              alt='Logo'
              width={140}
              height={32}
              className='block dark:hidden'
            />
            <Image
              src='/images/logo/logo-dark.svg'
              alt='Logo'
              width={140}
              height={32}
              className='hidden dark:block'
            />
          </Link>
        </div>

        {/* Center: Search Input (Desktop only) */}
        <div className='hidden w-full max-w-md lg:flex'>
          <div className='relative w-full'>
            <input
              ref={inputRef}
              type='text'
              placeholder='Search...'
              className='w-full rounded-md border px-4 py-2 pl-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            />
            <span className='absolute left-3 top-2.5 text-gray-400'>
              <svg
                className='h-4 w-4'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z'></path>
              </svg>
            </span>
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
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48 mr-4 mt-2'>
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
