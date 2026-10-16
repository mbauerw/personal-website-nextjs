import Link from "next/link";

// Shared "About Me" content. Each layout chooses how to reveal these; keep the text here
// so every design shows the same five blurbs.
const blurbs = [
  {
    id: "intro",
    label: "Hello",
    title: "Introduction",
    body: (
      <>
        Hello, I'm <span className="font-semibold text-blue-800">Max</span>
      </>
    ),
  },
  {
    id: "passions",
    label: "Passions",
    title: "Passions",
    body: (
      <>
        I'm passionate about{" "}
        <Link href="/music" className="underline text-red-600">Music</Link>, learning,{" "}
        <Link href="/portfolio" className="underline decoration-wavy text-emerald-600">web development</Link>, reading,
        guitar (electric == classical), piano, tennis, greek yogurt
      </>
    ),
  },
  {
    id: "priorities",
    label: "Priorities",
    title: "What Matters",
    body: <>The most important things in my life are friends, family and pets</>,
  },
  {
    id: "strengths",
    label: "Strengths",
    title: "Strengths",
    body: <>Strengths: Flexibility, creativity, determination, patience</>,
  },
  {
    id: "weaknesses",
    label: "Weaknesses",
    title: "Weaknesses",
    teaser: "Weaknesses: ...",
    body: (
      <>
        Weaknesses: Unconsciously setting down what I'm holding in my hand while in the process of looking for
        something I've lost and then, having found what I was originally looking for, needing to spend even more
        time looking for what I just had in my hand
      </>
    ),
  },
];

export default blurbs;
