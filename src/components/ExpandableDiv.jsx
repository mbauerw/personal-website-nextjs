'use client'
import React, {useState} from 'react';

function ExpandableDiv({
  index,
  label,
  imgId,
  local=true,
  sendState,
  isActive,
  // true when a sibling column is open; this column shrinks to half width
  isCompact=false,
  contentClick,
  height="xl:h-[84vh] h-24 min-h-24 ",
  width="xl:w-24 xl:min-w-24 w-[92vw] max-w-[92vw]",
  compactWidth="xl:w-12 xl:min-w-12 w-[92vw] max-w-[92vw]",
  expandedHeight="xl:h-[84vh] h-full ",
  expandedWidth="xl:w-full w-[92vw] max-w-[92vw]",
  overflow="overflow-y-auto",
  children,
  className}
  ) {
  const [hovered, setHovered] = useState(false);
  const expanded = isActive;

  // only one column may be open at a time; clicking the open one closes it
  const toggleExpand = () => {
    sendState(expanded ? null : index);
  }

  const mouseEnter = () => setHovered(true);
  const mouseLeave = () => setHovered(false);

  const collapsedWidth = isCompact ? compactWidth : width;
  // compact label is sized for Arial to fill the 3rem column with a slightly tighter gap
  // below the descenders than above the capitals; the label is rotated 180deg, so pl ends up on the right
  const labelSize = isCompact
    ? 'text-4xl sm:!text-5xl md:!text-6xl xl:!text-[2rem] xl:!leading-none p-4 xl:pl-[0.58rem] xl:pr-[0.4rem]'
    : 'text-4xl sm:!text-5xl md:!text-6xl p-4';

  return (
    <div
      onClick={toggleExpand}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className={`xl:transition-[width,min-width] transition-[height] ease-in-out duration-800 outline-1 outline-neutral-200 overflow-hidden cursor-pointer bg-white rounded
        shadow-xl shadow-neutral-400 hover:outline-1 hover:outline-black
        ${expanded ? `${expandedHeight} ${expandedWidth} ` : `${height} ${collapsedWidth}`} ${expanded ? 'hover:none' : 'hover:bg-blue-200'}
        ${expanded ? 'flex flex-col' : ''}
        `}
    >
      {!expanded && <p className={`font-bold xl:[writing-mode:vertical-lr] xl:rotate-180 whitespace-nowrap ${labelSize}`}>{label}</p>}

      {expanded && (
        <div className={`h-full w-full overflow-x-hidden ${overflow}`}>
          {children}
        </div>
      )}
    </div>
  )
}

export default ExpandableDiv;
