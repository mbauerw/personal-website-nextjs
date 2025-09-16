'use client'
import Link from "next/link";
import React, { useRef, useState, useEffect, forwardRef } from "react";
import { SECTIONS } from '../constants/sections';

const DropdownStack = ({ showElement, heroRef, className, refs, links = [], onClickAway }) => {
  const dropdownRef = useRef(null);
  const linkStyle = "text-neutral-300 hover:bg-neutral-900 hover:rounded-sm a3 flex py-3" // Added py-3 for vertical spacing

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Handle click away functionality
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && showElement) {
        if (onClickAway) {
            onClickAway(); 
        }
      }
    };

    if (showElement) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showElement, onClickAway]);

  // Default links if none provided
  const defaultLinks = [
    { href: "/", label: "HOME" },
    { href: `/#${SECTIONS.HOME.HERO}`, label: "ABOUT", onClick: () => scrollToSection(heroRef) },
    { href: "/portfolio", label: "PORTFOLIO" },
    { href: "/music", label: "MUSIC" },
    { href: "/contact", label: "CONTACT" }
  ];

  const linksToRender = links.length > 0 ? links : defaultLinks;
  console.log("Showelement in dropstack: " + showElement);

  return (
    
    <div
      ref={dropdownRef} 
      className={`absolute top-full -mt-10  -ml-15 w-35 bg-neutral-600 backdrop-blur-md cursor-pointer rounded-md shadow-lg z-50 transition-all duration-1200`}
      onClickAway={onClickAway}
      onMouseLeave={onClickAway}
    >
    {linksToRender.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className="block rounded-sm outline-1 outline-neutral-700 cursor-pointer px-4 py-2 text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors duration-200"
        onClick={link.onClick}        
      >
        {link.label}
      </Link>
    ))}
  </div>
  )
}

export default DropdownStack;


{/* <nav 
      ref={dropdownRef}
      className={`w-3/4 h-auto bg-logo content-center transition-all transition-discrete ease-in-out duration-800
        ${showElement ? 'opacity-100 duration-1600' : 'opacity-0 duration-800'} ${className}`}>
      <ul 
        className={`transition-all transition-discrete flex-col justify-between space-y-2 ${showElement ? 'opacity-100 duration-1000' : 'opacity-0 duration-800'} `}>
        {linksToRender.map((link, index) => (
          <Link 
            key={index}
            href={link.href} 
            className={linkStyle}
            onClick={link.onClick}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav> */}