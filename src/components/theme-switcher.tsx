'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import * as React from 'react'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Sun className="m500:h-4 m500:w-4 hidden h-6 w-6 stroke-text dark:inline" />
      <Moon className="m500:h-4 m500:w-4 inline h-6 w-6 stroke-text dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
