 // Bar Scroll listener
 // uses useRef "bodyRef" to get height from desired component 
    
useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const cHeight = bodyRef.current.getBoundingClientRect().height;
    const scrollRatio = scrollTop/cHeight;

    console.log("Scroll point: " + scrollTop);

    
    if(scrollTop < 2450){
      setImageBank(3);

    }
    if(scrollTop < 2150){
      setImageBank(1);
    }
    if(scrollTop < 1001){
      setImageBank(0);
    }
    if(scrollTop > 2450){
      setImageBank(2);
    }
  };

  window.addEventListener("scroll", handleScroll);

  // Cleanup
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
  }, []);



  // Logo markup
  {/* <div
          id="logo-wrap" 
          className="h-1/2 w-full flex justify-center relative">
          <Link to="/about" className = {`w-90 h-7/8 p-1 absolute bottom-0 transition-all transition-discrete duration-1000 ${showElement ? 'opacity-100 duration-2000' : 'opacity-0 fill-neutral-800' }`}>
            <img src="/images/logo_darkgray.png" className={`w-full ${showElement ? 'opacity-100 duration-1200 h-full' : 'opacity-0 h-0 duration-1000' }`} id="logo-image" />
          </Link>
        </div>         */}



// import React, { useRef, useState, useEffect } from "react";
// import { useInView } from 'motion/react';

// function Blank({
//   offset = 200,
//   height = 300,
//   label = "",
//   className = "",
//   background = "",
//   speed = 0.4,
//   children
// }) {
  
//   const [offsetY, setOffsetY] = useState(0);
//   const elementRef = useRef(null);

//   // Pass the ref directly as first argument
//   const isInView = useInView(elementRef, {
//     threshold: 0,
//     triggerOnce: false, 
//     rootMargin: '0px 0px' 
    
//   });

//   useEffect(() => {
//     const handleScroll = () => {
//         setOffsetY(window.pageYOffset);
//         console.log(" This is the div in view: " + label);
//         console.log("pageYOffset: " + window.pageYOffset * speed);         
//     };
    
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);    
//   }, [isInView]); 

//   return (
//     <div
//       ref={elementRef} 
//       className={`w-full bg-repeat bg-cover flex flex-col justify-center ${background} ${className}`} 
//       style={{
//         height: `${height}px`,
//         backgroundPosition: `center ${offsetY}px`, 
//         backgroundAttachment: 'scroll'
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// export default Blank;