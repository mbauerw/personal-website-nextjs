'use client'
import React, { forwardRef } from 'react';
import Portfolio from './Portfolio';
import Portrait from '../components/Portrait';
import ScrollReveal from '../components/animation/ScrollReveal';
import Corkboard from '../components/about/Corkboard';

const Hero = forwardRef(({ height = 900, minHeight = 900, className = "" }, ref) => {
  return (
    <div
      id="hero-wrap"
      className={`w-full justify-center min-h-[1800px] ${className} grid lg:grid-cols-[4fr_5px_2fr] md:grid-rows-[1fr_6fr] grid-rows-[100px_6fr] grid-cols-1 space-y-30 lg:min-h-[1000px] lg:max-h-[1024px] pt-5 z-0`}
      ref={ref}
      >
      {/* banner   */}
      <div className='col-span-full row-span-1 w-full justify-self-center'>
        <ScrollReveal delay={.2} triggerOnce={true} duration={1.5} direction='up' >
          <div className='bg-linear-to-br from-amber-500 to-yellow-500  justify-self-center
            lg:h-16 lg:w-110 md:h-13 md:w-90 xs:h-11 xs:w-70 h-10 mt-3'>
            <p className='text-white sm:ml-7 a6 xs:pt-3 pt-1 weight-500 lg:text-8xl lg:w-140 md:text-7xl md:w-110 sm:text-6xl xs:w-[120%] xs:text-6xl w-[100%] text-[9cqw] ml-3'>
              About   Me
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* blurbs   */}
      <div className='col-span-1 row-span-1 w-[95%] max-w-[64rem] justify-self-center self-center lg:pr-6'>
        <Corkboard />
      </div>
      {/* line */}
      <div className='bg-white lg:-mt-8 lg:mb-[10px] z-0 lg:col-span-1 lg:row-span-1 row-span-1 col-span-1 lg:h-full h-2 lg:w-[95%] lg:mr-0 lg:-ml-2 mr-4 ml-4 xs:max-w-screen '>
      </div>
      {/* portrait   */}
      <div id="portrait-wrap" className='col-span-1 row-span-1 w-[95%] h-[95%] justify-self-center content-center'>
        <Portrait image={"/images/headshot_trim.png"} background='bg-[url("/images/background/purple_smudge.jpg")] cursor-pointer' height={500} width={300}></Portrait>
      </div>
    </div>
  )

});

export default Hero;

/*  Banner Color Options

from-blue-500 to-blue-400
from-amber-500 to-yellow-500
*/
