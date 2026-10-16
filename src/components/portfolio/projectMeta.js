// Small helpers for presenting project data in the editorial layout.

export const pad = (n) => String(n).padStart(2, "0");

// "regroove.fm", "github.com/mbauerw", or "On this site" for internal links.
export function destinationLabel(project) {
  if (!project.external) return "On this site";
  try {
    const url = new URL(project.href);
    const host = url.host.replace(/^www\./, "");
    const path = url.pathname.replace(/\/$/, "");
    return host + path;
  } catch {
    return project.href;
  }
}

export function repoLabel(repo) {
  return repo.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
