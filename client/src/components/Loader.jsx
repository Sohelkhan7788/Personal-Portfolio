import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#0f0f1a]">

      <div className="absolute w-40 h-40 bg-primary/20 blur-3xl rounded-full" />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-black text-primary"
      >
        SK
      </motion.div>

    </div>
  );
};

export default Loader;