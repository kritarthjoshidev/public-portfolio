import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => (
  <div className="loader">
    <motion.div
      className="loader__ring"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
    <motion.p
      className="loader__text"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      Loading...
    </motion.p>
  </div>
);

export default Loader;
