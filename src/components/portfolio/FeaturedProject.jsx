'use client'
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import GridBox from "../GridBox";
import ProjectLink from "./ProjectLink";
import Reveal from "./Reveal";
import { destinationLabel, pad, repoLabel } from "./projectMeta";

const labelStyle = "font-mono text-[0.6875rem] tracking-[0.16em] text-stone-500 pt-[0.2em]";
const captionLink =
  "inline-flex items-start gap-1 text-stone-900 [overflow-wrap:anywhere] underline decoration-stone-300 underline-offset-4 hover:text-orange-700 hover:decoration-orange-700 transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700";

// Allow long URLs to wrap after slashes rather than mid-word.
const withBreaks = (text) =>
  text.split("/").flatMap((part, i, arr) =>
    i < arr.length - 1
      ? [<span key={i} className="whitespace-nowrap">{part}/</span>, <wbr key={`b${i}`} />]
      : [<span key={i} className="whitespace-nowrap">{part}</span>]
  );

// A wide GridBox with an editorial caption (number, year, stack, source) beside it on
// large screens and beneath it on smaller ones. Year / tech / repo are optional; without a
// repo the caption links to the project's own href.
export default function FeaturedProject({ project, index, flip = false }) {
  const { year, tech, repo } = project;
  const hasTech = Array.isArray(tech) && tech.length > 0;

  return (
    <article
      aria-label={project.title}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 md:py-16 border-b border-stone-300 last:border-b-0"
    >
      <Reveal className={`lg:col-span-7 xl:col-span-8 ${flip ? "lg:order-2" : ""}`}>
        <GridBox
          thumb={project.thumb}
          title={project.title}
          category={project.category}
          description={project.description}
          className={project.thumbClassName ?? ""}
          titleStyle="!text-[1.125rem] sm:!text-[1.375rem] lg:!text-[1.5rem] tracking-[-0.01em]"
          boxClassName=""
          thumbAreaClassName="aspect-[4/3] sm:aspect-[16/10]"
          infoClassName=""
          revealOnFocus
        >
          <ProjectLink project={project} />
        </GridBox>
      </Reveal>

      <Reveal
        delay={0.1}
        className={`lg:col-span-5 xl:col-span-4 flex flex-col md:grid md:grid-cols-[9rem_1fr] md:gap-x-8 lg:flex ${flip ? "lg:order-1" : ""}`}
      >
        <div className="flex items-baseline gap-4 md:block">
          <p
            aria-hidden="true"
            className="font-serif text-[3.5rem] md:text-[4.5rem] leading-[0.9] tracking-[-0.03em] text-orange-700"
          >
            {pad(index)}
          </p>
          <p className={`${labelStyle} md:mt-4`}>
            <span className="uppercase">Featured</span>
          </p>
        </div>

        <dl className="mt-6 md:mt-0 lg:mt-10 text-[0.9375rem] leading-[1.5] text-stone-800">
          {year && (
            <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-stone-300 py-3">
              <dt className={labelStyle}><span className="uppercase">Year</span></dt>
              <dd className="font-serif text-[1.0625rem]">{year}</dd>
            </div>
          )}
          {hasTech && (
            <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-stone-300 py-3">
              <dt className={labelStyle}><span className="uppercase">Stack</span></dt>
              <dd>
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {tech.map((t, i) => (
                    <li key={t} className="whitespace-nowrap">
                      {t}
                      {i < tech.length - 1 && <span aria-hidden="true" className="ml-3 text-stone-300">/</span>}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-b border-stone-300 py-3">
            <dt className={labelStyle}><span className="uppercase">{repo ? "Source" : "Link"}</span></dt>
            <dd className="min-w-0">
              {repo || project.external ? (
                <a href={repo ?? project.href} className={captionLink}>
                  <span>{withBreaks(repo ? repoLabel(repo) : destinationLabel(project))}</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 mt-[0.2em] shrink-0" />
                </a>
              ) : (
                <Link href={project.href} className={captionLink}>
                  <span>{withBreaks(destinationLabel(project))}</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 mt-[0.2em] shrink-0" />
                </Link>
              )}
            </dd>
          </div>
        </dl>
      </Reveal>
    </article>
  );
}
