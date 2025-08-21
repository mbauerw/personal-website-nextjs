'use client'
import React from 'react';
import { ChevronDown, ArrowDown } from 'lucide-react';

const BouncingArrow = ({ref, onClick, className, title, circle}) => {

  const bg_amber = "bg-amber-500/40 hover:bg-amber-500/60";
  const bg_amber_lite = "bg-amber-500/20 hover:bg-amber-500/30";
  const bg_sky = "bg-sky-800/20 hover:bg-sky-800/40";
  const bg_sky_lite = "bg-sky-700/10 hover:bg-sky-700/20";
  const bg_slate = "bg-slate-800/10 hover:bg-slate-800/20";
  const bg_gray = "bg-gray-700/30 hover:bg-gray-700/40";
  const bg_white = "bg-white hover:bg-amber-500/20";


  const text_blue = "text-blue-900/80";
  const text_green = "text-green-800/90";
  const text_cyan = "text-cyan-800/90";
  const text_white = "text-white/80 group-hover:text-white"

  

  return (
    <div className="flex items-center justify-center h-[50vh] mb-10">
      <div className={`group flex flex-col justify-center items-center rounded-full h-90 w-90 transition-all transition-discrete duration-1400 cursor-pointer ${circle} ${className}`}
        onClick={() => onClick(ref)}>
        <div className="h-1/2 flex justify-center items-center pb-10">
          <h1 className={`text-8xl a6 font-bold transition-all transition-discrete duration-1400 ${text_white}`}>{title}</h1>
        </div>
        
      </div>
    </div>
  );
};

export default BouncingArrow;

/* Bg options

bg-amber-500/40 hover:bg-amber-500/70
<div className=" h-1/2 ">
  <ArrowDown
    className={`w-36 h-36 ${text_blue} mx-auto animate-bounce animate-duration-2000 cursor-pointer transition-colors duration-1000`}
    style={{
      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.7))'
    }}
    onClick={() => onClick(ref)}

  /> 
  
</div>
 
*/