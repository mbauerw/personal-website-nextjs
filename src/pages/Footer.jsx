'use client'
import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, Coffee, MapPin, Calendar, ExternalLink, Download } from 'lucide-react';


const Footer = ({className}) => {

  return (
  <div className={`space-y-4 z-5 ${className}`}>
      <footer className="bg-zinc-700 border-t border-black py-7">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">MB</span>
            </div>
            {/* <h3 className="text-2xl font-semibold text-neutral-800 mb-2">Max Bauer</h3> */}
            <p className="text-gray-400">Computer Scientist • Web Developer • Music Enthusiast</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <a href="mailto:max.bauer.wd@gmail.com" className="flex items-center text-gray-400 hover:text-gray-900 transition-colors max-w-[92vw] overflow-hidden">
              <Mail className="xs:!w-5 xs:!h-5 mr-2" />
              max.bauer.wd@gmail.com
            </a>
            <div className="flex space-x-4">
              <a href="https://github.com/mbauerw" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/mw-bauer/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-black pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
              <p>&copy; 2025 Max Bauer. All rights reserved.</p>
              <p className="mt-2 sm:mt-0">Currently available for freelance work</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )  
}

export default Footer;
