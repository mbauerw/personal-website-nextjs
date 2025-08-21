'use client'
import { Link } from "react-router-dom"
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

  // resize listener


  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const breakpoint = 768;

  const [isAbove, setIsAbove] = useState(
    typeof window !== 'undefined' ? window.innerWidth > breakpoint : false
  );

  const [isBroken, setIsBroken] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {

      setIsAbove(window.innerWidth > breakpoint);

    };

    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, [breakpoint]);


  useEffect(() => {
    if (isAbove && expanded) {
      setExpanded(false);
    }
  }, [isAbove, expanded]);


  // console.log("Breaker Breaker: " + isBroken);
  // console.log(" are we above " + isAbove);
  // console.log("The width in here is small: " + viewportSize.width);
  // console.log("The width in here iasdfasdfasdf: " + window.innerWidth);

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