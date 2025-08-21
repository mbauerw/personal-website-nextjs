'use client'
import Link from "next/link";
import React, { useRef, useState, useEffect, forwardRef } from "react";
import { SECTIONS } from '../constants/sections';

const DropdownStack = ({showElement, heroRef, className, refs, links = [], onClickAway}) => {
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
    { to: "/", label: "HOME" },
    { to: `/#${SECTIONS.HOME.HERO}`, label: "ABOUT", onClick: () => scrollToSection(heroRef) },
    { to: "/portfolio", label: "PORTFOLIO" },
    { to: "/Music", label: "MUSIC" },
    { to: "/Contact", label: "CONTACT" }
  ];
  
  const linksToRender = links.length > 0 ? links : defaultLinks;
  console.log("Showelement in dropstack: " + showElement);
  
  return (
    <nav 
      ref={dropdownRef}
      className={`w-3/4 h-auto bg-logo content-center transition-all transition-discrete ease-in-out duration-800
        ${showElement ? 'opacity-100 duration-1600' : 'opacity-0 duration-800'} ${className}`}>
      <ul 
        className={`transition-all transition-discrete flex-col justify-between space-y-2 ${showElement ? 'opacity-100 duration-1000' : 'opacity-0 duration-800'} `}>
        {linksToRender.map((link, index) => (
          <Link 
            key={index}
            href={link.to} 
            className={linkStyle}
            onClick={link.onClick}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default DropdownStack;