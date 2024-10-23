import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-bg z-50 w-full"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.75, delay: 1.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex space-x-4">
        <motion.div
          className="bg-main w-8 h-8 border-border rounded-base border-2 shadow-light"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="bg-main w-8 h-8 border-border rounded-base border-2 shadow-light"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
        />
        <motion.div
          className="bg-main w-8 h-8 border-border rounded-base border-2 shadow-light"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror", delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;