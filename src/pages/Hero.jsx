'use client'
import React, { forwardRef, useEffect, useState, useRef } from 'react';
import Portfolio from './Portfolio';
import Portrait from '../components/Portrait';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/animation/ScrollReveal';




const Hero = forwardRef(({ height = 900, minHeight = 900, className = "" }, ref) => {
  const [hovered, setHovered] = useState(false);
  const [firstHovered, setFirstHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const firstRef = useRef(null);
  const [currentId, setCurrentId] = useState(null);

  const [selectedId, setSelectedId] = useState(null);

  const handleParagraphClick = (e, id) => {
    e.stopPropagation();
    
    if (id == currentId){
      setSelectedId(null);
      setCurrentId(null);
      return;
    }
    setCurrentId(id);
    setSelectedId(id);
    console.log("ayo you clicked the P: " + id)
  };

  const handleWrapClick = () => {
    setSelectedId(null);
    setCurrentId(null);
  }

  const mouseEnter = () => setHovered(true);
  const mouseLeave = () => {
    setHovered(false);
    setFirstHovered(false);

  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setFirstHovered(true);
            setHasAnimated(true);
          }, 300);
        }
      },
      { threshold: 0.3 }
    );

    if (firstRef.current) {
      observer.observe(firstRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const boxStyle = `group w-1/2 xs:min-w-100 min-w-[72%] z-1 a6 xs:!text-4xl text-3xl shadow-lg shadow-black antialiased border-gray-300 border-4 border-b-gray-400 p-10 rounded-xl 
  hover:z-11 hover:w-full hover:!text-5xl hover:overflow-visible hover:w-full hover:-ml-2  hover:whitespace-normal hover:min-h-60 bg-gray-400 hover:bg-white
  sm:hover:h-100 md:hover:h-80 lg:hover:h-70 hover:h-140 hover:p-4 lg:-ml-16 lg:mr-4 lg:-mt-8 -ml-2 mr-2 truncate transision-all duration-1000 transform hover:-translate-y-14`

  return (
    <div
      id="hero-wrap"
      className={`w-full justify-center min-h-[1800px] ${className} grid lg:grid-cols-[4fr_5px_2fr] md:grid-rows-[1fr_6fr] grid-rows-[100px_6fr] grid-cols-1 space-y-30 lg:min-h-[1000px] lg:max-h-[1024px] pt-5 z-0`}
      ref={ref}
      onClick={handleWrapClick}
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
      <div className='col-span-1 relative rounded-sm row-span-1 max-h-[900px] grid grid-cols-1 grid-rows-5 w-[95%] h-[95%] lg:min-h-[500px] px-5 justify-self-center content-center lg:justify-center justify-items-center py-5'>
        <p key={1} ref={firstRef} onMouseLeave={mouseLeave} onClick={(e) => handleParagraphClick(e, 1)} className={`group w-1/2 xs:min-w-100 min-w-[72%] z-1 xs:text-4xl text-3xl a6  shadow-lg shadow-black antialiased border-gray-300 border-4 border-b-gray-400 p-10 rounded-xl -mt-0 
          hover:z-10 hover:!text-5xl hover:w-full hover:overflow-visible hover:-ml-6 hover:whitespace-normal hover:min-h-50 bg-gray-400 hover:bg-white hover:-translate-y-6
          ${selectedId === 1 ? 'z-10 !text-5xl w-full overflow-visible lg:!-ml-6 whitespace-normal min-h-50 bg-gray-400 bg-white -translate-y-6 cursor-pointer border-red-500 border-b-red-500' : ''}
          lg:-ml-32 lg:mr-0 -ml-4 mr-4 truncate transition-all duration-1000 transform  ${firstHovered ? 'z-10 w-full lg:!-ml-6 overflow-visible whitespace-normal min-h-50 text-5xl -translate-y-6 bg-white' : 'hover:cursor-pointer'}`}
          >
          Hello, I'm  <a className={`group-hover:text-blue-800 group-hover:font-semibold group-hover:text-7xl transition-all duration-400 ${firstHovered ? 'text-blue-800 font-semibold text-7xl' : ''}`}> Max </a>
        </p>
        <p key={2} onMouseEnter={mouseLeave} onClick={(e) => handleParagraphClick(e, 2)} className={`group w-1/2 xs:min-w-100 min-w-[72%] z-1 a6 xs:!text-4xl text-3xl shadow-lg shadow-black antialiased border-gray-300 border-4 border-b-gray-400 p-10 rounded-xl 
          hover:z-11 hover:w-full hover:!text-4xl hover:overflow-visible hover:w-full hover:-ml-2  hover:whitespace-normal hover:min-h-60 bg-gray-400 hover:bg-white
          hover:h-70 md:hover:h-60 lg:hover:h-50 hover:p-4 lg:-ml-16 lg:mr-4 lg:-mt-8 -ml-2 mr-2 truncate transision-all duration-1000 transform hover:-translate-y-14 
          ${selectedId === 2 ? 'z-10 !text-5xl w-full overflow-visible lg:!-ml-6 whitespace-normal md:!min-h-50 min-h-70 bg-gray-400 bg-white -translate-y-14 !p-2 cursor-pointer border-red-500 border-b-red-500' : 'hover:cursor-pointer'}`} 
          
          >
          Passions: <a className={`group-hover:underline group-hover:text-red-600 ${selectedId === 2 ? 'underline text-red-600' : ''}`}>Music</a>, learning, <Link to="/portfolio" className="group-hover:underline group-hover:decoration-wavy group-hover:text-emerald-500 transision-all duration-500">web development</Link>, reading,
          guitar (electric == classical), piano, tennis, greek yogurt
        </p>
        <p key={3} onMouseEnter={mouseLeave} onClick={(e) => handleParagraphClick(e, 3)} className={`group w-1/2 xs:min-w-100 min-w-[72%] min-w-100 max-h-55 z-2  a6 xs:text-4xl text-3xl hover:!text-5xl  shadow-lg shadow-black antialiased border-gray-300 border-4 border-b-gray-400 p-10 rounded-xl
          hover:z-12 hover:w-full hover:z-10 hover:w-full hover:overflow-visible hover:whitespace-normal hover:max-h-55 hover:max-h-60 hover:h-60 bg-gray-400 hover:bg-white
          lg:-ml-0 lg:mr-8 lg:-mt-8 ml-0 mr-0 truncate transision-all duration-1000 transform hover:-translate-y-14 
          ${selectedId === 3 ? 'z-10 !text-5xl w-full overflow-visible lg:!-ml-6 whitespace-normal min-h-50 bg-gray-400 bg-white !-translate-y-14 cursor-pointer border-red-500 border-b-red-500' : 'hover:cursor-pointer'}`}>
          Loves: Family, Friends, Pets
        </p>
        <p key={4} onMouseEnter={mouseLeave} onClick={(e) => handleParagraphClick(e, 4)} className={`relative w-1/2 xs:min-w-100 min-w-[72%] z-3 hover:z-10 a6  xs:text-4xl text-3xl hover:!text-4xl hover:lg:!text-5xl shadow-lg shadow-black antialiased border-gray-300 border-4 border-b-gray-400 rounded-xl w-1/2 col-span-1 p-10  truncate
        hover:z-13 hover:w-full hover:overflow-visible hover:whitespace-normal hover:h-80 sm:hover:h-70 md:hover:h-60 lg:hover:h-55 hover:pt-5 bg-gray-400 hover:bg-white
        lg:ml-0 lg:mr-0 lg:-mt-8 ml-2 -mr-2  truncate transision-all duration-1000 transform hover:-translate-y-14 
        ${selectedId === 4 ? 'z-10 lg:!text-5xl text-4xl w-full overflow-visible lg:!-ml-6 whitespace-normal min-h-50 bg-gray-400 bg-white -translate-y-14 !p-2 cursor-pointer border-red-500 border-b-red-500' : 'hover:cursor-pointer'}`}>
          Strengths: Flexibility, creativity, determination, patience
        </p>
        <div onMouseEnter={mouseLeave} className='relative w-1/2 xs:min-w-100 min-w-[72%] z-3 hover:z-10 a6 text-4xl hover:!text-5xl shadow-lg shadow-black antialiased border-gray-300 rounded-xl w-1/2 col-span-1  truncate
        hover:overflow-visible hover:whitespace-normal hover:h-80 sm:hover:h-70 md:hover:h-60 lg:hover:h-55 hover:w-full
        lg:ml-4 lg:-mr-2 lg:-mt-8 ml-4 -mr-4  truncate transision-all duration-1000 transform hover:-translate-y-14 '>
          {!hovered ? (
            <p className={`absolute z-3 xs:min-w-full min-w-[110%] min-h-55 hover:z-10 a6 xs:text-4xl text-3xl hover:!text-2xl shadow-lg shadow-black antialiased border-gray-300 border-4 border-b-gray-400 rounded-xl h-full p-2
              hover:z-14 sm:hover:w-full hover:overflow-visible hover:whitespace-normal hover:min-h-full hover:-ml-0 hover:mr-8 bg-gray-400 hover:bg-white
              lg:ml-0 lg:mr-0 truncate  transision-all duration-1000 pl-10 `}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave} >
              <br />
              Weaknesses: <span className="text-bold text-blue-800 text-7xl"> ... </span>
            </p>

          ) : (
            <p className='absolute z-3 xs:min-w-full min-w-[110%] hover:z-10 a6 text-4xl hover:!text-4xl bg-neutral-100 shadow-lg shadow-black antialiased border-gray-200 border-4 border-b-gray-400 rounded-xl 
              hover:z-14 sm:hover:w-full hover:overflow-visible hover:whitespace-normal hover:-ml-0 hover:mr-4 hover:min-h-full bg-gray-400 hover:bg-white hover:p-5
              lg:-ml-0 lg:mr-0 lg:-mt-0 truncate transision-all duration-1000 
            '
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave} >
              Weaknesses: Unconsciously setting down what I'm holding in my hand while in the process of looking for something I've lost and then, having found what I was originally looking for, needing to spend even more time looking for what I just had in my hand
            </p>
          )}

        </div>


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

lg:p-12 p-5 rounded-xl relative -mt-8 lg:-ml-4 lg:mr-4 -ml-3 mr-3  


<p className='group relative z-0 min-w-100 max-h-50 a6 text-4xl shadow-lg shadow-black bg-neutral-100 antialiased border-gray-300 border-4 border-b-gray-400 rounded-xl w-1/2 col-span-1 p-10 -mt-0 -ml-8 mr-3 truncate 
          hover:z-10 hover:w-full hover:overflow-visible hover:whitespace-normal
          lg:-ml-8 lg:mr-8 transision:all duration-1000'>
          Hello, I'm  <a className="group-hover:text-blue-800 group-hover:font-semibold group-hover:text-6xl transision-all duration-500"> Max </a> 
        </p>
*/
