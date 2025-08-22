'use client'
import { useLayoutContext } from '../contexts/LayoutContext'
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
// Remove React Router imports:
// import { useOutletContext, useLocation } from 'react-router-dom';

// Add Next.js imports:
import { usePathname, useSearchParams } from 'next/navigation'

import Hero from "./Hero";
import Blank from "../components/Blank";
import About from "./About";
import Portfolio from "./Portfolio";
import BouncingArrow from "../components/BouncingArrow";
import { SECTIONS } from "../constants/sections";
import SkillsSection from "../components/skills/SkillSection";
import {animateScroll as scroll, scroller } from 'react-scroll';
import { ChevronUp } from "lucide-react";
import ScrollReveal from "../components/animation/ScrollReveal";

const Home = () => {
  const { homeRef, heroRef, aboutRef, skillsRef, scrollToSection } = useLayoutContext()
  const [offset, setOffset] = useState(0);

  // background images
  const backgrounds = [
    '/images/block1/dot_lights.jpg',
    '/images/background/pixel_cabin.jpg'
  ]

  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

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

  // Hash scrolling - Next.js version
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for hash in the URL
    if (typeof window !== 'undefined' && window.location.hash) {
      setTimeout(() => {
        const elementId = window.location.hash.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          scroller.scrollTo(elementId, {
            duration: 2000,
            delay: 100,
            smooth: 'easeInOutQuart',
            offset: 0
          });
        }
      }, 0);
    }
  }, [pathname]); // Listen to pathname changes instead of location.hash

  return (
    <main className="" id="homeRef" ref={homeRef}>
      {/* Rest of your JSX stays the same */}
      <Blank
        height={"110vh"}
        offset={0}
        label={"First"}
        background={backgrounds[0]}
        speed={3}
      >
        <BouncingArrow
          ref={heroRef}
          title="Max Bauer"
          onClick={(ref) => scrollToSection(ref)}
          className=" bg-none hover:bg-black/20 z-20"
        >
        </BouncingArrow>
      </Blank>
      <div id={SECTIONS.HOME.HERO}>
        <Hero
          minHeight={900}
          className={'bg-slate-900/90'}
          ref={heroRef}>
        </Hero>
      </div>
      <div className="relative">
        <div id={SECTIONS.HOME.SKILLS} className="absolute mt-15">
        </div>
        <SkillsSection ref={skillsRef} />
      </div>

      <div className="relative">
        <div id={SECTIONS.HOME.ABOUT} className="absolute mt-5">
        </div> 
          <About
            className={`bg-slate-900/90`}
            ref={aboutRef}>
          </About>
      </div>

      <Blank
        height={"600px"}
        label={"Third"}
        offset={0}
        background={backgrounds[1]}
        imgHeight="200%"
        className="opacity-100 relative"
        speed={5}
      >
        <div className="xs:w-screen xs:h-screen xs:max-w-screen max-w-[50vw]  flex flex-col justify-end items-end p-2 pr-6 z-40 overflow-hidden">
          <ScrollReveal margin="0px 0px -200px 0px" threshold={.1} distance={20} duration={1.5} delay={.5}>
            <div className={`w-10 h-10 bg-white opacity-80 rounded-md shadow-sm hover:cursor-pointer shadow-black z-50  flex justify-center items-center`}>
              <ChevronUp className="animate-bounce " onClick={() => scrollToSection(homeRef)}>
              </ChevronUp>
            </div>
          </ScrollReveal>
        </div>
      </Blank>
    </main>
  )
}

export default Home;