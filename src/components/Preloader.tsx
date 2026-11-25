'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111] text-white"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: [0.85, 1.02, 1], opacity: 1 }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
            className="font-black text-2xl tracking-[0.3em] uppercase font-mono mb-6"
          >
            ALINA <span className="text-neutral-500">&amp;</span> ADONIS
          </motion.div>

          <div className="w-40 h-[2px] bg-neutral-800 overflow-hidden relative rounded-full">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="w-full h-full bg-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}