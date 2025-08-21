import React, { useState, useEffect, forwardRef } from "react";
import { Github, Linkedin, Twitter, Mail, Heart, Coffee, MapPin, Calendar, ExternalLink, Download } from 'lucide-react';


const Logos = ({position, showElement, iconSize}) => {

  return (
    <div className={`flex space-x-4 absolute transition-all duration-800 ${position} ${showElement ? 'opacity-100' : 'opacity-0'}`}>
        <a href="https://github.com/mbauerw" className="text-gray-400 hover:text-gray-600 transition-colors">
          <Github className={`w-5 h-5  text-neutral-300 ${iconSize}`} />
        </a>
        <a href="https://www.linkedin.com/in/mw-bauer/" className="text-gray-400 hover:text-gray-600 transition-colors">
          <Linkedin className={`w-5 h-5 text-neutral-300 ${iconSize}`} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
          <Twitter className={`w-5 h-5 text-neutral-300 ${iconSize}`} />
        </a>
      </div> 
  )
}

export default Logos;