'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ThemeSwitcher } from './theme-switcher'
import LocaleSwitcher from './locale-switcher'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const locale = useLocale()
  const path = usePathname()
  const t = useTranslations('Header')
  const [activeIndex, setActiveIndex] = useState(0)
  const [borderPosition, setBorderPosition] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const links = [
    { path: '', text: t('home') },
    { path: '/about', text: t('about') },
    { path: '/work', text: t('work') },
  ]

  const updateBorderPosition = () => {
    if (navRef.current) {
      const activeLink = navRef.current.children[activeIndex] as HTMLElement
      const linkRect = activeLink.getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()

      setBorderPosition({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      })
    }
  }

  useEffect(() => {
    const currentLinkIndex = links.findIndex((link) => {
      if (link.path === '/work') {
        return path.startsWith(`/${locale}${link.path}`)
      }
      return path === `/${locale}${link.path}`
    })

    if (currentLinkIndex !== -1) {
      setActiveIndex(currentLinkIndex)
    }
  }, [path, locale])

  useEffect(() => {
    updateBorderPosition()
  }, [activeIndex])

  useEffect(() => {
    const handleResize = () => {
      updateBorderPosition()
    }

    // Listen to window resize events
    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [activeIndex])

  return (
    <div className="fixed left-0 top-5 z-50 flex w-full">
      <nav
        ref={navRef}
        className="w450:gap-4 relative mx-auto flex w-max items-center gap-2.5 rounded-base border-2 border-border bg-main p-2.5 px-5 text-xs font-base text-text shadow-light dark:border-darkBorder dark:bg-darkMain dark:shadow-dark sm:gap-5 sm:text-base"
      >
        {links.map((link, index) => {
          return (
            <Link
              prefetch={true}
              key={link.path}
              className={clsx(
                'relative z-10 rounded-base py-1 pl-2 pr-1.5 transition-colors',
              )}
              href={`/${locale}${link.path}`}
              onClick={() => setActiveIndex(index)}
            >
              {link.text}
            </Link>
          )
        })}
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 my-2 rounded-base border-2 border-border "
          animate={borderPosition}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          style={{
            left: borderPosition.left,
            width: borderPosition.width,
          }}
        />
        <ThemeSwitcher />
        <LocaleSwitcher locale={locale} path={path} />
      </nav>
    </div>
  )
}
