'use client'
import React, {useEffect, useState} from 'react';
import Photo from './PropPractice';

function ExpandableDiv({
  index, 
  label, 
  imgId,
  local=true, 
  sendState, 
  isActive,
  contentClick, 
  height="xl:h-[84vh] h-24 min-h-24 ",
  width="xl:w-24 xl:min-w-24 w-[92vw] max-w-[92vw]",
  expandedHeight="xl:h-[84vh] h-full ",
  expandedWidth="xl:w-full w-[92vw] max-w-[92vw]",
  children,
  className}
  ) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleExpand = () => {

    setExpanded(prev => !prev);
    sendState(index);
  }

  const mouseEnter = () => setHovered(true);
  const mouseLeave = () => setHovered(false);


  return (
    <div 
      onClick={toggleExpand}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className={`xl:transition-[width] transition-[height] ease-in-out duration-800 outline-1 outline-neutral-200 overflow-hidden cursor-pointer bg-white rounded
        shadow-xl shadow-neutral-400 hover:outline-1 hover:outline-black
        ${expanded ? `${expandedHeight} ${expandedWidth} ` : `${height} ${width}`} ${expanded ? 'hover:none' : 'hover:bg-blue-200'}
        ${expanded ? 'flex flex-col' : ''}
        `}
    >
      {!expanded && <p className={`font-bold text-4xl xl:[writing-mode:vertical-lr] xl:rotate-180 sm:!text-5xl md:!text-6xl p-4`}>{label}</p>}
      {/* {expanded && <div className="h-1/3 w-400 overflow-hidden"><Photo imgId={imgId} local={local}></Photo></div>} */}
      {/* {expanded && <div className="h-1/4 w-full overflow-hidden flex justify-center items-center bg-linear-to-br from-gray-200 to-slate-300"><p className='text-8xl a1 text-neutral-800'>{label}</p></div>} */}

      {expanded && <div className="h-full w-full">{children}</div>} 
      
      
    </div>
  )
}

export default ExpandableDiv;

