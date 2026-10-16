'use client'
import GridBox from "../components/GridBox";
import projects from "../components/portfolio/projects";
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

  const linkStyle = "bg-white bg-opacity-90 text-slate-700 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300";

  const projectLink = (project) => project.external
    ? <a href={project.href} className={linkStyle}>{project.linkLabel}</a>
    : <Link href={project.href} className={linkStyle}>{project.linkLabel}</Link>;

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
            
            {projects.map((project) => (
              <GridBox
                key={project.id}
                thumb={project.thumb}
                title={project.title}
                category={project.category}
                description={project.description}
                titleStyle={project.titleStyle}
                className={project.thumbClassName ?? ""}
              >
                {projectLink(project)}
              </GridBox>
            ))}
          </div>
        </div>
      </ParallaxProvider>
    </div>
  );
}

export default Portfolio;