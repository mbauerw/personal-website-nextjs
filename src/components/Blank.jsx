'use client'
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from 'motion/react';

function Blank({
  offset = 0,
  height = 300,
  label = "",
  className = "",
  background = "",
  speed = .5,
  imgHeight = "120%",
  children
}) {
  const [offsetY, setOffsetY] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const ref = useRef(null);


  const isInView = useInView(ref, {
    threshold: 0,

    once: false,

    margin: "100px 0px 100px 0px"
  });

   const calculateParallaxOffset = useCallback(() => {
    if (isInView && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementHeight = rect.height;
      const totalDistance = windowHeight + elementHeight;
      const progress = (windowHeight - rect.top) / totalDistance;
      
      const screenMultiplier = window.innerWidth < 768 ? 0.7 : 1;
      const maxOffset = elementHeight * .2 * screenMultiplier;
      return (progress - 0.5) * maxOffset * speed;
    }
    return 0;
  }, [speed, isInView]);

  // Initialize parallax position and set up scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (isInView && ref.current) {
        const newOffset = calculateParallaxOffset();
        setOffsetY(newOffset);
      }     
    };

    // Calculate initial position immediately
    if (isInView && !isInitialized) {
      handleScroll(); // This will set the initial position
      setIsInitialized(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [calculateParallaxOffset, isInView, isInitialized]);
  

  
  return (
    <div
      ref={ref}
      className={`w-full relative flex bg-gray-200 flex-col justify-center overflow-hidden z-0 ${className}`} 
      style={{
        height: `${height}`
      }}
    >
      <img 
        src={background}
        alt={label}
        className="z-1 absolute"
        style={{
          transform: `translateY(${offsetY + offset}px)`,
          width: '100%',
          height: `${imgHeight}`, // Make image larger to prevent gaps
          objectFit: 'cover'
        }}
        />
      {children}
    </div>
  );
}

export default Blank;








