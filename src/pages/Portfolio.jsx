'use client'
import GridBox from "../components/GridBox";
import Link from "next/link";
import React from "react";
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

function Portfolio({
  offset = 0,
  speed = 5,
  label = "",
  imgHeight = "100%"
}) {

  const background = "/images/block1/wood.jpg";

  const thumbs = [
    "bg-[url('/images/thumbs/ratio_heatmap.png')]",
    "bg-[url('/images/thumbs/regroove-blueish.png')]",
    "bg-[url('/images/thumbs/elff.png')]",
    "bg-[url('/images/thumbs/Bauer-Photo-scaled.webp')]",
    "bg-[url('/assets/GitHub_Logo.png')]",
    "bg-[url('/images/bauerj.png')]"
  ]

  const gdplink = (<Link href="/gdp" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</Link>);
  const playuplink = (<a href="https://www.regroove.com" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</a>);
  const elfflink = (<a href="https://elff.com/" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</a>);
  const dadlink = (<a href="https://johannesmbauer.com/" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</a>);
  const gitlink = (<a href="https://github.com/mbauerw" className="bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300">View Project</a>);

  return (
    <div className="relative bg-none w-full min-h-[140vh] h-full z-0 overflow-hidden">
      <ParallaxProvider>
        {/* Parallax background image */}
        <Parallax speed={-40} className="absolute inset-0 -z-10 h-full">
          <img 
            src={background}
            alt={label}
            className="w-full h-full object-cover opacity-90"
          />
        </Parallax>

        <div className="max-w-[80vw] min-h-[130vh] mx-auto mt-12 pt-14 bg-gray-800/98 z-3 px-4 sm:px-10 rounded-xl">
          <div className="text-center pb-12">
            <h2 className="text-5xl a6 md:text-5xl text-stone-100 mb-2 font-bold">My Stuff</h2>
            <p className="text-lg a6 text-stone-100">Explore my latest projects and creative work</p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(1fr,1fr))] xs:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 sm:gap-6 md:gap-10 py-3 pt-10">
            
            <GridBox thumb={thumbs[0]} title={"The Impact of Economic Growth on Population Change"} category={"Data Analysis"} description={"Data Analysis project exploring the relationships between economic growth and population change across the United States"} titleStyle={"text-sm 2xs:text-md xs:!text-lg"} className={"bg-cover"} children={gdplink}></GridBox>
   
            <GridBox thumb={thumbs[1]} title={"ReGroove"} category={"Web App and API Integration"} description={"Web App leveraging Spotify's API to provide more compelling playlists"} children={playuplink} className={"bg-cover"}></GridBox>

            <GridBox thumb={thumbs[2]} title={"East Lansing Film Festival"} category={"Web Development"} description={"Website for the non-profit film patron The East Lansing Film Festival"} children={elfflink}></GridBox>

            <GridBox thumb={thumbs[5]} title={"Website for My Dad"} category={"Community Service (jk)"} description={"Who wouldn't want to help build a website for their Dad?"} children={dadlink}></GridBox>

            <GridBox thumb={thumbs[4]} title={"Github Repositories"} category={"Miscellaneous"} description={"Link to a variety of finished and unfinished projects hosted on my Github"} children={gitlink}></GridBox>
          </div>
        </div>
      </ParallaxProvider>
    </div>
  );
}

export default Portfolio;