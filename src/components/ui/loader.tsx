import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex w-full items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 1.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex space-x-4">
        <motion.div
          className="h-8 w-8 rounded-base border-2 border-border bg-main shadow-light"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'mirror' }}
        />
        <motion.div
          className="h-8 w-8 rounded-base border-2 border-border bg-main shadow-light"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: 0.2,
          }}
        />
        <motion.div
          className="h-8 w-8 rounded-base border-2 border-border bg-main shadow-light"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: 0.4,
          }}
        />
      </div>
    </motion.div>
  )
}

export default Loader
