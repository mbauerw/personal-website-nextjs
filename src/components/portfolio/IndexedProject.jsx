'use client'
import GridBox from "../GridBox";
import ProjectLink from "./ProjectLink";
import Reveal from "./Reveal";
import { destinationLabel, pad } from "./projectMeta";

// A GridBox in the magazine grid, headed by a hairline rule carrying its number and
// destination. `layout` supplies the grid placement and the card's aspect ratio.
export default function IndexedProject({ project, index, layout, delay = 0 }) {
  return (
    <Reveal className={layout.cell} delay={delay}>
      <article aria-label={project.title}>
        <div className="flex items-baseline gap-4 border-t border-stone-300 pt-3 mb-5 font-mono text-[0.6875rem] md:text-[0.75rem] tracking-[0.16em] text-stone-500">
          <span aria-hidden="true" className="text-orange-700">{pad(index)}</span>
          <span className="ml-auto truncate tracking-[0.04em]">{destinationLabel(project)}</span>
        </div>
        <GridBox
          thumb={project.thumb}
          title={project.title}
          category={project.category}
          description={project.description}
          titleStyle={project.titleStyle}
          className={project.thumbClassName ?? ""}
          boxClassName={layout.box}
          revealOnFocus
        >
          <ProjectLink project={project} />
        </GridBox>
      </article>
    </Reveal>
  );
}
