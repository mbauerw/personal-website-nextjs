'use client'
import React, { useRef, useState, useEffect, forwardRef } from "react";
import { SECTIONS } from '../constants/sections';
import { Menu, SquareMenu } from "lucide-react";
import DropdownStack from "./DropdownStack";

const Dropdown = ({ iconSize, className, iconClass, showElement, heroRef, refs }) => {

  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);

  const handleClickAway = () => {
    setShowDropdown(false);
    setExpanded(false);
  };

  const toggleExpand = () => {
    setExpanded(prev => !prev);
    setShowDropdown(true);
  }

  // Fix: Add window check for viewport size
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const breakpoint = 768;

  const [isAbove, setIsAbove] = useState(
    typeof window !== 'undefined' ? window.innerWidth > breakpoint : false
  );

  const [isBroken, setIsBroken] = useState(false);

  // Fix: Add window check and update viewport size in resize handler
  useEffect(() => {
    const checkBreakpoint = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setIsAbove(width > breakpoint);
        setViewportSize({
          width: width,
          height: window.innerHeight
        });
      }
    };

    // Set initial values
    checkBreakpoint();

    // Add event listener only if window exists
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkBreakpoint);
      return () => window.removeEventListener('resize', checkBreakpoint);
    }
  }, [breakpoint]);

  useEffect(() => {
    if (isAbove && expanded) {
      setExpanded(false);
    }
  }, [isAbove, expanded]);

  return (
    <div className={` h-full w-auto ${className}`}>
      <div className={` h-full w-auto`}>
        {!expanded && <Menu onClick={toggleExpand} size={iconSize} className={`text-gray-400 hover:text-gray-600  ${iconClass}`} />}
        {expanded && showDropdown && <DropdownStack showElement={showElement} awayElement={showDropdown} onClickAway={handleClickAway} heroRef={heroRef} refs={refs}/>}
      </div>
    </div>
  )
}

export default Dropdown;