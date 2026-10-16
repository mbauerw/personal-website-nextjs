// Shared portfolio content. Each layout chooses how to arrange these; keep the copy here so
// every design shows the same projects. `thumb` is a Tailwind background-image class
// (written out in full so Tailwind picks it up), `thumbClassName` adjusts how it fills the card.
// Optional fields (`year`, `tech`, `repo`) are only filled in where known.

const projects = [
  {
    id: "codebase-remap",
    title: "Codebase Remap",
    category: "AI Developer Tool",
    description:
      "Turns any GitHub repository into an interactive dependency graph, with Claude-generated file summaries and a chat assistant for asking questions about the code",
    thumb: "bg-[url('/images/thumbs/codebase-remap.png')]",
    thumbClassName: "bg-cover bg-top",
    href: "https://github.com/mbauerw/visual-codebase",
    external: true,
    linkLabel: "View Project",
    year: 2026,
    tech: ["React", "TypeScript", "FastAPI", "Python", "Tree-sitter", "Claude API", "Supabase"],
    repo: "https://github.com/mbauerw/visual-codebase",
  },
  {
    id: "sheettotab",
    title: "SheetToTab",
    category: "Web App · Music Tech",
    description:
      "Converts sheet music (MusicXML or scanned PDF) into playable guitar tab, with side-by-side notation, synthesized playback and a custom fret-placement engine",
    thumb: "bg-[url('/images/thumbs/sheettotab.png')]",
    thumbClassName: "bg-cover bg-center",
    href: "https://github.com/mbauerw/sheettotab",
    external: true,
    linkLabel: "View Project",
    year: 2026,
    tech: ["React", "TypeScript", "Vite", "alphaTab", "Supabase", "Docker", "Audiveris OMR"],
    repo: "https://github.com/mbauerw/sheettotab",
  },
  {
    id: "gdp-population",
    title: "The Impact of Economic Growth on Population Change",
    category: "Data Analysis",
    description:
      "Data Analysis project exploring the relationships between economic growth and population change across the United States",
    thumb: "bg-[url('/images/thumbs/ratio_heatmap.png')]",
    thumbClassName: "bg-cover",
    titleStyle: "text-sm 2xs:text-md xs:!text-lg",
    href: "/gdp",
    external: false,
    linkLabel: "View Project",
  },
  {
    id: "regroove",
    title: "ReGroove",
    category: "Web App and API Integration",
    description: "Web App leveraging Spotify's API to remix playlists and deposit them directly to your profile",
    thumb: "bg-[url('/images/thumbs/regroove-blueish.png')]",
    thumbClassName: "bg-cover",
    href: "https://www.regroove.fm",
    external: true,
    linkLabel: "View Project",
  },
  {
    id: "elff",
    title: "East Lansing Film Festival",
    category: "Web Development",
    description: "Website for the non-profit film patron The East Lansing Film Festival",
    thumb: "bg-[url('/images/thumbs/elff.png')]",
    href: "https://elff.com/",
    external: true,
    linkLabel: "View Project",
  },
  {
    id: "dad-site",
    title: "Website for My Dad",
    category: "Community Service (jk)",
    description: "Who wouldn't want to help build a website for their Dad?",
    thumb: "bg-[url('/images/bauerj.png')]",
    href: "https://johannesmbauer.com/",
    external: true,
    linkLabel: "View Project",
  },
  {
    id: "github",
    title: "Github Repositories",
    category: "Miscellaneous",
    description: "Link to a variety of finished and unfinished projects hosted on my Github",
    thumb: "bg-[url('/assets/GitHub_Logo.png')]",
    href: "https://github.com/mbauerw",
    external: true,
    linkLabel: "View Project",
  },
];

export default projects;
