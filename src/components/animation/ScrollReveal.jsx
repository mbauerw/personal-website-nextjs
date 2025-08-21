import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';


const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  distance = 50,
  threshold = 0.1,
  margin = '0px 0px 0px 0px',
  triggerOnce = true 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    margin: `${margin}` // Trigger slightly before element is fully visible
  });

  const directionOffset = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffset[direction]
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0
      } : {
        opacity: 0,
        ...directionOffset[direction]
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1] // Custom cubic-bezier for smooth motion
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;