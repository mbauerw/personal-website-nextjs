'use client'
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const linkStyle =
  "inline-flex items-center gap-2 bg-white/90 text-stone-900 px-5 py-2.5 rounded-full font-medium no-underline hover:bg-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

// The call-to-action rendered inside GridBox's hover/tap overlay.
export default function ProjectLink({ project }) {
  const label = `${project.linkLabel}: ${project.title}`;

  if (project.external) {
    return (
      <a href={project.href} className={linkStyle} aria-label={label}>
        {project.linkLabel}
        <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
      </a>
    );
  }

  return (
    <Link href={project.href} className={linkStyle} aria-label={label}>
      {project.linkLabel}
      <ArrowRight aria-hidden="true" className="w-4 h-4" />
    </Link>
  );
}
