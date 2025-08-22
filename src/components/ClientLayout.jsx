'use client'

import React, { useRef, useState, useEffect } from "react";
import Header from './Header';
import Footer from "../pages/Footer";
import { scroller } from 'react-scroll';

function ClientLayout({ children }) {
  // Keep ALL your existing logic exactly the same
  const homeRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);

  const refs = {
    homeRef, heroRef, aboutRef, skillsRef
  };

  const backgrounds = [
    'bg-[url("/images/background/blueish_stars.jpg")]',
    'bg-[url("/images/background/purple_castle.jpg")]',
    'bg-[url("/images/background/time_lapse_sky_mountains.avif")]',
    'bg-[url("/images/background/misty_woods.avif")]'
  ]

  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const scrollToSection = (ref, duration = 1500) => {
    if (!ref.current) {
      console.log('no ref current');
      return;
    }

    scroller.scrollTo(ref.current.id || 'target', {
      duration: duration,
      delay: 10,
      smooth: 'easeInOutQuart',
      offset: 0
    })
  }

  // Keep your existing useEffects
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  return (

    <div id="full-page-wrap">
      <div className={`relative flex flex-col min-h-screen`}>
        <div id="header-wrap">
          <Header
            refs={refs}
            homeRef={homeRef}
            heroRef={heroRef}
            aboutRef={aboutRef}
            skillsRef={skillsRef}
            viewportSize={viewportSize}
            scrollToSection={scrollToSection}
          />
        </div>

        <div className="outlet-content">
          {React.cloneElement(children, {
            homeRef,
            heroRef,
            aboutRef,
            skillsRef,
            scrollToSection
          })}
        </div>
        <Footer className="mt-auto" />
      </div>
    </div>

  )
}

export default ClientLayout;