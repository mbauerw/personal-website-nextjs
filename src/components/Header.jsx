import NavBar from "./NavBar";
import React, { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom"
import Logos from "./Logos";
import Dropdown from "./Dropdown";



const Header = ({ homeRef, heroRef, skillsRef, aboutRef, refs, scrollToSection, headerStyle = "bg-neutral-700" }) => {

  const [showElement, setShowElement] = useState(true);
  const [pastScroll, setPastScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const clientHeight = document.body.offsetHeight;
      const scrollRatio = scrollTop / clientHeight;
      if (scrollTop > 5) {
        setShowElement(false);
        setPastScroll(true);

      }

      if (scrollTop < 5) {
        setShowElement(true);
        setPastScroll(false);

      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mouseEnter = () => setShowElement(true);
  const mouseLeave = () => {
    if (pastScroll) {
      setShowElement(false);
    }

  }

  return (
    <div
      id="header-wrap"
      className={`w-full ${headerStyle}`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div
        id="header-wrap-inner"
        className={`w-full fixed flex flex-row justify-center items-center z-50 transition-[height,_opacity] transition-discrete border-none
         duration-1000 ${headerStyle} ${showElement ? 'h-12 opacity-100 shadow-zinc-30 duration-300 ' : 'h-8 opacity-0 duration-1000'} `}>
                          {/*  duration affects navbar shrink */}
        <div id="nav-wrap-inner" className={`md:flex md:w-full hidden h-5/9 w-0 flex justify-center content-end transition-all transition-discrete md:duration-0 duration-500  ${showElement ? 'opacity-100 ' : 'opacity-0'}`}
        >
          <NavBar showElement={showElement} homeRef={homeRef} heroRef={heroRef} skillsRef={skillsRef} aboutRef={aboutRef} refs={refs} scrollToSection={scrollToSection}></NavBar>
        </div>
                            {/* delay affects icon appear time | md:duration affects navbar expand from collapse | duration affects icon speed of appearance  */}
        <div className={` md:w-0 md:h-0 md:delay-0 delay-600 flex h-7/9 w-full justify-center content-end transition-all md:duration-1100 duration-500  ${showElement ? 'opacity-100 ' : 'opacity-0'}`}>
          <Dropdown className="md:delay-0 md:h-0 delay-600 md:duration-900 duration-0" iconClass="md:hidden flex md:h-0 h-full delay-600" showElement={showElement} heroRef={heroRef} refs={refs}></Dropdown>
        </div>
        <Logos position="right-5" iconSize={"hover:text-neutral-500 transition-[color]"} showElement={showElement} />
      </div>

    </div>
  )
}

export default Header;