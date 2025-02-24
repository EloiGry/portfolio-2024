'use client'

import { motion } from 'framer-motion'
import useWindowSize from '@/hooks/useWindowSize'

export default function Transition({
  children,
}: {
  children: React.ReactNode
}) {
  const { width } = useWindowSize()
  return (
    <motion.div
      className="font-base fade-in"
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: width, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  )
}
