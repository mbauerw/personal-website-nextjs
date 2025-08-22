'use client'
import Link from "next/link";
import React, { useRef, useState, useEffect, forwardRef, useMemo } from "react";
import { SECTIONS } from '../constants/sections';
import DropdownStack from "./DropdownStack";

function NavBar({showElement, homeRef, heroRef, skillsRef, aboutRef, refs, scrollToSection, links = [], navStyle = "bg-neutral-600 rounded-xl " }) {

    const linkStyle = "text-neutral-200 hover:bg-neutral-800 hover:rounded-md hover:-translate-y-[2px] hover:shadow-sm hover:shadow-neutral-900 transition-all duration-800 b5 md:flex hidden"

    const [aboutHovered, setAboutHovered] = useState(false);

    const mouseEnter = () => {
      setAboutHovered(true);
    };

    const mouseLeave = () => {
      setAboutHovered(false);
    }

    // console.log('Refs received:', {heroRef, skillsRef, aboutRef});
   

    // Example dropdown links for ABOUT section
    const defaultLinks = [
      { href: `/#${SECTIONS.HOME.HERO}`, label: "The Highlights", onClick: () => scrollToSection(heroRef)},
      { href: `/#${SECTIONS.HOME.SKILLS}`, label: "Skill Set", onClick: () => scrollToSection(skillsRef) },
      { href: `/#${SECTIONS.HOME.ABOUT}`, label: "The Details", onClick: () => scrollToSection(aboutRef)}
    ];

    const aboutDropdownLinks = links.length > 0 ? links : defaultLinks;

    return (
      <nav 
        className={`w-2/3 h-full content-center transition-all transition-discrete ease-in-out duration-800
          ${showElement ? 'opacity-100 duration-1600' : 'opacity-0 duration-800'} ${navStyle}`}>
        <ul 
          className={`transition-all transition-discrete md:flex md:justify-around relative ${showElement ? 'opacity-100 duration-1000' : 'opacity-0 duration-800'} `}>
          <Link href="/" className={linkStyle} onClick={() => scrollToSection(homeRef)}>HOME</Link>
          
          {/* ABOUT link with dropdown container */}
          <div 
            className="relative"
            onMouseEnter={mouseEnter} 
          >
            <Link 
              href={`/#${SECTIONS.HOME.HERO}`} 
              className={linkStyle} 
              onClick={() => scrollToSection(heroRef)}
            >
              ABOUT
            </Link>
            
            {/* Dropdown menu */}
            {aboutHovered && (
              <div 
                className={`absolute top-full -ml-10 w-35 bg-neutral-700 rounded-md shadow-lg z-50 transition-all duration-1200 ${aboutHovered ? 'opacity-100' : 'opacity-0'}`}
                onMouseLeave={mouseLeave}>
                {aboutDropdownLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block px-4 py-2 text-neutral-200 hover:bg-neutral-600 hover:text-white transition-colors duration-200"
                    onClick={link.onClick}        
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link href="/portfolio" className={linkStyle}>PORTFOLIO</Link>
          <Link href="/music" className={linkStyle}>MUSIC</Link>
          <Link href="/contact" className={linkStyle}>CONTACT</Link>
        </ul>
      </nav>
    )
  }
  
  export default NavBar;




      