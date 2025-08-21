'use client'
import GridBox from "../components/GridBox";
import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from 'motion/react';

function Portfolio({
  offset = 0,
  speed = 5,
  label = "",
  imgHeight = "100%"
  }) {

  // parallax 
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const background = "/images/block1/wood.jpg";

  const isInView = useInView(ref, {
    threshold: 0,
    once: true,
    margin: "0px 0px 0px 0px"
  });

  const calculateParallaxOffset = useCallback(() => {
    if (isInView && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementHeight = rect.height;
      const totalDistance = windowHeight + elementHeight;
      const progress = (windowHeight - rect.top) / totalDistance;
      
      const screenMultiplier = window.innerWidth < 768 ? 0.2 : 1;
      const maxOffset = elementHeight * .2 * screenMultiplier;
      return (progress - 0.5) * maxOffset * speed;
    }
    return 0;
  }, [speed, isInView]);

  // Initialize parallax position and set up scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (isInView && ref.current) {
        const newOffset = calculateParallaxOffset();
        setOffsetY(newOffset);
      }     
    };

    // Calculate initial position immediately
    if (isInView && !isInitialized) {
      handleScroll(); // This will set the initial position
      setIsInitialized(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [calculateParallaxOffset, isInView, isInitialized]);
  
  

  const thumbs = [
    "bg-[url('/images/thumbs/ratio_heatmap.png')]",
    "bg-[url('/images/thumbs/play_up_logo.png')]",
    "bg-[url('/images/thumbs/elff.png')]",
    "bg-[url('/images/thumbs/Bauer-Photo-scaled.webp')]",
    "bg-[url('/assets/GitHub_Logo.png')]",
    "bg-[url('/images/bauerj.png')]"
  ]

  const portLink = (<a href="#" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</a>)
  
  const gdplink = (<Link href="/gdp" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</Link>);
  const playuplink = (<a href="https://github.com/mbauerw/playup" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</a>);
  const elfflink = (<a href="https://elff.com/" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</a>);
  const dadlink = (<a href="https://johannesmbauer.com/" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</a>);
  const gitlink = (<a href="https://github.com/mbauerw" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</a>);


  return (
    <div
      ref={ref}
      className="relative bg-none w-full min-h-[140vh] h-full z-0 overflow-hidden">
      <img 
        src={background}
        alt={label}
        className="-z-1 absolute opacity-92 transition-transform duration-0"
        style={{
          transform: `translateY(${offsetY + offset}px)`,
          width: '100%',
          height: `${imgHeight}`,
          objectFit: 'cover'
        }}
        />
      <div className="max-w-[80vw] min-h-[130vh] mx-auto mt-12 pt-14 bg-gray-800/98 z-3 px-10 rounded-xl ">
        <div className="text-center pb-12">
          <h2 className="text-5xl a6 md:text-5xl text-stone-100 mb-2 font-bold">My Stuff</h2>
          <p className="text-lg a6  text-stone-100">Explore my latest projects and creative work</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] md:grid-rows-[repeat(auto-fit,minmax(350px,1fr))] gap-6 md:gap-10 py-3 pt-10">
         
          <GridBox thumb={thumbs[0]} title={"The Impact of Economic Growth on Population Change"} category={"Data Analysis"} description={"Data Analysis project exploring the relationships between economic growth and population change across the United States"} className={"bg-cover"} children={gdplink}></GridBox>
 
          <GridBox thumb={thumbs[1]} title={"Play Up"} category={"Web app and API Integration"} description={"Web App leveraging Spotify's API to provide more compelling playlists"} children={playuplink}></GridBox>

          <GridBox thumb={thumbs[2]} title={"East Lansing Film Festival"} category={"Web Development"} description={"Website for the non-profit film patron The East Lansing Film Festival"} children={elfflink}></GridBox>

          <GridBox thumb={thumbs[5]} title={"Website for My Dad"} category={"Community Service (jk)"} description={"Who wouldn't want to help build a website for their Dad?"} children={dadlink}></GridBox>

          <GridBox thumb={thumbs[4]} title={"Github Repositories"} category={"Miscellaneous"} description={"Link to a variety of finished and unfinished projects hosted on my Github"} children={gitlink}></GridBox>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;