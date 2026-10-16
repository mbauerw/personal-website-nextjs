// Section title row: serif heading on the left, small mono annotation on the right,
// sitting on a heavy rule with a hairline beneath.
export default function SectionHeader({ id, title, note }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t-2 border-stone-900 border-b border-b-stone-300 py-5 md:py-6">
      <h2
        id={id}
        className="font-serif font-normal text-[1.75rem] md:text-[2.25rem] leading-[1.1] tracking-[-0.015em] text-stone-900"
      >
        {title}
      </h2>
      {note && (
        <p className="font-mono text-[0.6875rem] md:text-[0.75rem] tracking-[0.16em] text-stone-500 text-right">
          <span className="uppercase">{note}</span>
        </p>
      )}
    </div>
  );
}
