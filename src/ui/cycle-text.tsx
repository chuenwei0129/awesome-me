import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface CycleTextProps {
  staticText?: string;
  dynamicTexts?: string[];
}

export default function CycleText({ staticText = '👋 你好，我是 ', dynamicTexts = [' < 奀歪 /> ', ' <chuenwei0129/> '] }: CycleTextProps) {
  const total = dynamicTexts.length;

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <span className="font-mono text-xl text-pink-600">
        {staticText}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`words_${index}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.08 }}
            className="inline-block font-mono text-xl text-blue-700"
          >
            {dynamicTexts[index]}
          </motion.h1>
        </AnimatePresence>
      </span>
    </div>
  );
}
