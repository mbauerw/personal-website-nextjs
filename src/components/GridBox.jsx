'use client'

import { useState } from 'react'

const GridBox = ({ thumb, title, description, category, className, titleStyle = "text-sm 2xs:text-lg xs:!text-xl", children }) => {
  const [isContentVisible, setIsContentVisible] = useState(false)

  const handleClick = () => {
    setIsContentVisible(!isContentVisible)
  }

  return (
    <div
      className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      <div className={`w-full h-[70%] bg-contain bg-center bg-no-repeat relative ${thumb} ${className}`}>
        <div
          id="gb-hidden-content"
          className={`absolute inset-0 bg-black/90 bg-opacity-40 flex flex-col items-center justify-center transition-opacity duration-300 ${isContentVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        >
          <div className="h-1/2 flex flex-col justify-end items-center pb-5">
            {children}
          </div>
          <div className="h-1/2 flex flex-col justify-start items-center pt-2">
            <p className="opacity-100 text-white px-8 text-center"> {description} </p>
          </div>
        </div>
      </div>
      <div className="p-5 h-[30%] flex flex-col justify-center bg-gray-300/50">
        <h3 className={`font-semibold text-slate-700 mb-1 ${titleStyle}`}>{title}</h3>
        <p className={`text-[3vw] xs:!text-sm text-gray-500 uppercase tracking-wider `}>{category}</p>
      </div>
    </div>
  )
}

export default GridBox;