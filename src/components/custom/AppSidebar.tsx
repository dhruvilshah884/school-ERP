'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'
import {
  ChevronDown,
  Split,
  UserRound,
  Users,
  LucideBoxes,
  Wallet,
  HandCoinsIcon,
  PersonStandingIcon,
  LayoutDashboard,
  Ellipsis
} from 'lucide-react'
import Icon from '../../../public/images/logo.png'

type NavItem = {
  name: string
  icon: React.ReactNode
  path?: string
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[]
}

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={20} />,
    name: 'Dashboard',
    path: '/dashboard'
  },
  {
    name: 'Students',
    icon: <Users size={20} />,
    path: '/students'
  },
  {
    name: 'Teachers',
    icon: <UserRound size={20} />,
    path: '/teachers'
  },
]

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<{ type: 'main' | 'others'; index: number } | null>(null)
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const isActive = useCallback((path: string) => pathname === path, [pathname])

  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu(prev =>
      prev?.index === index && prev?.type === menuType ? null : { type: menuType, index }
    )
  }

  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`
      if (subMenuRefs.current[key]) {
        setSubMenuHeight(prev => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0
        }))
      }
    }
  }, [openSubmenu])

  const renderMenuItems = (items: NavItem[], type: 'main') => (
    <ul className="space-y-2">
      {items.map((item, idx) => {
        const isOpen = openSubmenu?.type === type && openSubmenu?.index === idx
        return (
          <li key={item.name}>
            {item.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(idx, type)}
                className={`flex items-center w-full px-4 py-2 rounded-md transition hover:bg-dark-100 dark:hover:bg-dark-800 ${
                  isOpen ? 'bg-gray-100 dark:bg-dark-800' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <>
                    <span className="flex-1 text-left">{item.name}</span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      size={18}
                    />
                  </>
                )}
              </button>
            ) : (
              item.path && (
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-red-800 ${
                    isActive(item.path) ? 'bg-blue-100 text-blue-600 dark:bg-blue-900' : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {(isExpanded || isHovered || isMobileOpen) && <span>{item.name}</span>}
                </Link>
              )
            )}

            {item.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
              ref={el => {
                subMenuRefs.current[`${type}-${idx}`] = el;
              }}
            
                className="transition-all overflow-hidden"
                style={{ height: isOpen ? `${subMenuHeight[`${type}-${idx}`]}px` : '0px' }}
              >
                <ul className="pl-10 pr-4 py-2 space-y-2">
                  {item.subItems.map(sub => (
                    <li key={sub.name}>
                      <Link
                        href={sub.path}
                        className={`flex justify-between items-center text-sm py-1 px-2 rounded-md hover:bg-dark-100 dark:hover:bg-dark-800 ${
                          isActive(sub.path) ? 'bg-blue-50 text-blue-600 dark:bg-blue-900' : ''
                        }`}
                      >
                        {sub.name}
                        {(sub.pro || sub.new) && (
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded-md ${
                              sub.new
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}
                          >
                            {sub.new ? 'New' : 'Pro'}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <aside
      className={`fixed z-50 top-0 left-0 h-screen transition-all duration-300 border-r bg-black dark:bg-dark-900 dark:border-dark-800 ${
        isExpanded || isMobileOpen ? 'w-[280px]' : isHovered ? 'w-[280px]' : 'w-[80px]'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 flex items-center justify-start lg:justify-start gap-2">
        <Image src={Icon} alt="Logo" width={32} height={32} />
        {(isExpanded || isHovered || isMobileOpen) && (
          <span className="text-lg font-semibold text-dark-800 dark:text-dark">School ERP</span>
        )}
      </div>

      <nav className="overflow-y-auto px-2 py-4 scrollbar-thin scrollbar-thumb-dark-300 dark:scrollbar-thumb-dark-700">
        {renderMenuItems(navItems, 'main')}
      </nav>
    </aside>
  )
}

export default AppSidebar
