'use client'
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import projects from "../components/portfolio/projects";
import FeaturedProject from "../components/portfolio/FeaturedProject";
import IndexedProject from "../components/portfolio/IndexedProject";
import Reveal from "../components/portfolio/Reveal";
import SectionHeader from "../components/portfolio/SectionHeader";
import { pad } from "../components/portfolio/projectMeta";

// The list is ordered newest first; the first two are featured.
const FEATURED_COUNT = 2;
const featured = projects.slice(0, FEATURED_COUNT);
const rest = projects.slice(FEATURED_COUNT);

const years = projects.map((p) => p.year).filter(Boolean);
const latestYear = years.length ? Math.max(...years) : null;

// Asymmetric placements for the magazine grid (cycled if more projects are added).
// `cell` positions the item on the 12-column grid; `box` sets the card's aspect ratio.
const GRID_LAYOUTS = [
  { cell: "sm:col-span-2 lg:col-span-7", box: "aspect-square sm:aspect-[16/10] lg:aspect-[4/3]" },
  { cell: "lg:col-span-5 lg:mt-28", box: "aspect-square sm:aspect-[5/6] xl:aspect-square" },
  { cell: "lg:col-span-4", box: "aspect-square sm:aspect-[5/6] xl:aspect-square" },
  { cell: "lg:col-span-4 lg:mt-16", box: "aspect-square sm:aspect-[5/6] xl:aspect-square" },
  { cell: "lg:col-span-4 lg:mt-32", box: "aspect-square sm:aspect-[5/6] xl:aspect-square" },
];

const container = "mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12";

function Portfolio() {
  const meta = [
    `${projects.length} projects`,
    `${featured.length} featured`,
    latestYear && `Latest ${latestYear}`,
  ].filter(Boolean);

  return (
    <main className="bg-stone-50 text-stone-900 font-jakarta antialiased overflow-x-clip">
      {/* Intro — top padding clears the fixed site header (h-12). */}
      <header className={`${container} pt-28 md:pt-36 lg:pt-40 pb-14 md:pb-20`}>
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[0.6875rem] md:text-[0.75rem] tracking-[0.2em] text-stone-500">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-orange-700" />
            <span className="uppercase">Portfolio</span>
          </p>

          <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-end">
            <h1 className="lg:col-span-8 font-serif font-normal !text-[3.25rem] sm:!text-[4.75rem] lg:!text-[6.25rem] xl:!text-[7.5rem] !leading-[0.92] tracking-[-0.035em] text-stone-900">
              Selected <em className="italic text-orange-700">Work</em>
            </h1>
            <p className="lg:col-span-4 max-w-[34rem] text-[1.0625rem] md:text-[1.1875rem] leading-[1.6] text-stone-600 lg:pb-3">
              Software, data and web projects, from AI developer tooling and music tech to data analysis and client websites.
            </p>
          </div>

          <ul
            aria-label="Portfolio summary"
            className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-stone-300 pt-4 font-mono text-[0.6875rem] md:text-[0.75rem] tracking-[0.16em] text-stone-500"
          >
            {meta.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="text-stone-300">·</span>}
                <span className="uppercase">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </header>

      <section aria-labelledby="featured-heading" className={`${container} pb-16 md:pb-24`}>
        <SectionHeader id="featured-heading" title="Featured" note={latestYear ? `New in ${latestYear}` : null} />
        {featured.map((project, i) => (
          <FeaturedProject key={project.id} project={project} index={i + 1} flip={i % 2 === 1} />
        ))}
      </section>

      {rest.length > 0 && (
        <section aria-labelledby="more-heading" className={`${container} pb-24 md:pb-32`}>
          <SectionHeader id="more-heading" title="More Work" note={`${pad(rest.length)} projects`} />
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-14 md:gap-y-20">
            {rest.map((project, i) => (
              <IndexedProject
                key={project.id}
                project={project}
                index={FEATURED_COUNT + i + 1}
                layout={GRID_LAYOUTS[i % GRID_LAYOUTS.length]}
                delay={(i % 2) * 0.08}
              />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="contact-heading" className="border-t border-stone-300">
        <div className={`${container} py-16 md:py-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
          <h2
            id="contact-heading"
            className="font-serif font-normal text-[2rem] md:text-[3rem] leading-[1.05] tracking-[-0.02em] max-w-[18ch]"
          >
            Have a project in mind?
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 self-start md:self-auto border-b-2 border-stone-900 pb-1 text-[1.0625rem] md:text-[1.125rem] font-medium text-stone-900 hover:text-orange-700 hover:border-orange-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          >
            Get in touch
            <ArrowRight aria-hidden="true" className="w-5 h-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Portfolio;
