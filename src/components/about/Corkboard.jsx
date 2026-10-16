'use client'
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { Hand, Heart, Music, Search, X, Zap } from "lucide-react";
import blurbs from "./blurbs";

/*
  Corkboard: five notes pinned to a cork board. Clicking a note "unpins" it: it straightens,
  lifts and flips (rotateY) to show the blurb on its back, enlarged over the board.
  Only one note is open at a time; clicking it again, the close button, the bare cork,
  or pressing Escape puts it back. Clicking another note swaps.

  The flight between the board slot and the centre of the board is a motion shared-layout
  animation (same layoutId in both places); the flip is a separate rotateY on an inner element.
*/

const FLIP = { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

// Per-note presentation. Keyed by blurb id so the copy itself stays in blurbs.jsx.
const NOTES = {
  intro: {
    variant: "index",
    tilt: -4,
    pin: "red",
    icon: Hand,
    backText: "text-3xl sm:text-4xl lg:text-5xl",
  },
  passions: {
    variant: "sticky",
    tilt: 3,
    pin: null,
    icon: Music,
    backText: "text-lg sm:text-xl lg:text-2xl",
  },
  priorities: {
    variant: "polaroid",
    tilt: -2,
    pin: null,
    icon: Heart,
    backText: "text-xl sm:text-2xl lg:text-3xl",
  },
  strengths: {
    variant: "kraft",
    tilt: 4.5,
    pin: "green",
    icon: Zap,
    backText: "text-xl sm:text-2xl lg:text-3xl",
  },
  weaknesses: {
    variant: "graph",
    tilt: -3,
    pin: "blue",
    icon: Search,
    // Longest blurb: smallest type so it fits the flipped card without scrolling.
    backText: "text-base sm:text-lg lg:text-xl 2xl:text-2xl",
  },
};

const FALLBACK_NOTE = { variant: "index", tilt: 0, pin: "red", icon: Hand, backText: "text-lg sm:text-xl" };

// Board placement. Mobile: 2 columns x 3 rows (last note centred across both).
// sm+: 6-column grid, 3 notes on top, 2 offset notes underneath.
const SLOT_CLASSES = [
  "sm:col-span-2",
  "sm:col-span-2 sm:translate-y-2",
  "sm:col-span-2 sm:-translate-y-1",
  "sm:col-span-2 sm:col-start-2 sm:-translate-x-2",
  "col-span-2 w-1/2 justify-self-center sm:col-span-2 sm:w-full sm:translate-x-2 sm:translate-y-1",
];

const PIN_COLORS = {
  red: ["#fecaca", "#dc2626", "#7f1d1d"],
  green: ["#bbf7d0", "#16a34a", "#14532d"],
  blue: ["#bfdbfe", "#2563eb", "#1e3a8a"],
};

const CORK_STYLE = {
  backgroundColor: "#b98654",
  backgroundImage: [
    "radial-gradient(circle at 30% 40%, rgba(74,42,16,0.38) 0 0.8px, transparent 1.4px)",
    "radial-gradient(circle at 70% 20%, rgba(255,232,196,0.30) 0 0.9px, transparent 1.6px)",
    "radial-gradient(circle at 50% 70%, rgba(92,54,22,0.28) 0 1.3px, transparent 2.2px)",
    "radial-gradient(circle at 20% 80%, rgba(60,32,12,0.22) 0 1.8px, transparent 3px)",
    "radial-gradient(circle at 80% 60%, rgba(255,226,180,0.18) 0 2px, transparent 3.4px)",
    "radial-gradient(ellipse at 50% 35%, rgba(255,214,160,0.22), transparent 70%)",
  ].join(", "),
  backgroundSize: "5px 5px, 7px 7px, 11px 11px, 17px 17px, 23px 23px, 100% 100%",
  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25), inset 0 6px 18px rgba(0,0,0,0.45), inset 0 0 60px rgba(60,30,10,0.35)",
};

const FRAME_STYLE = {
  backgroundColor: "#6b4423",
  backgroundImage: [
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 9px)",
    "repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 23px)",
    "linear-gradient(180deg, #8d5c33, #5b361a)",
  ].join(", "),
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.45)",
};

const HIDE_BACKFACE = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" };
const BACK_FACE = { ...HIDE_BACKFACE, transform: "rotateY(180deg)" };

// Ruled lines that track the text's own line-height (1.6em), nudged so text sits on them.
const RULED = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent calc(1.6em - 1px), rgba(96,165,250,0.35) calc(1.6em - 1px), rgba(96,165,250,0.35) 1.6em)",
  backgroundPosition: "0 -0.3em",
};

// Inside a slot the card (and its pin + ghost) sit in this box: inset from the cell edges so the
// tilt never clips, capped in width so cards stay card-shaped on wide single-column screens.
const SLOT_BOX = "absolute inset-1.5 sm:inset-2 mx-auto max-w-[16rem]";

const FACE = "@container [grid-area:card] relative block h-full w-full rounded-[3px]";
const FACE_SHADOW_PINNED =
  "shadow-[1px_4px_8px_rgba(0,0,0,0.45)] transition-shadow duration-300 group-hover:shadow-[2px_9px_16px_rgba(0,0,0,0.5)] motion-reduce:transition-none";
const FACE_SHADOW_LIFTED = "shadow-[0_30px_55px_-12px_rgba(0,0,0,0.85)]";

function Pin({ color }) {
  const [light, base, dark] = PIN_COLORS[color] ?? PIN_COLORS.red;
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 z-10 block size-4 -translate-x-1/2 -translate-y-1/4 rounded-full sm:size-5"
      style={{
        background: `radial-gradient(circle at 35% 30%, ${light} 0 14%, ${base} 48%, ${dark} 100%)`,
        boxShadow: "2px 4px 4px rgba(0,0,0,0.45), inset -1px -1px 2px rgba(0,0,0,0.3)",
      }}
    />
  );
}

function FrontLabel({ number, label, Icon, tone }) {
  return (
    <span className="relative flex h-full flex-col px-[8cqw] py-[6cqw]">
      <span className={`a6 self-end text-[length:max(0.625rem,6cqw)] tracking-wider ${tone.number}`}>{number}</span>
      <span className={`a6 my-auto font-bold leading-tight text-[length:13cqw] ${tone.label}`}>{label}</span>
      <Icon aria-hidden strokeWidth={1.75} className={`size-[12cqw] self-end ${tone.icon}`} />
    </span>
  );
}

// Front of a note. All sizes are in container units so it looks the same pinned or enlarged,
// which keeps the shared-layout flight from visibly jumping.
function NoteFront({ blurb, note, number, lifted }) {
  const shadow = lifted ? FACE_SHADOW_LIFTED : FACE_SHADOW_PINNED;
  const Icon = note.icon;

  switch (note.variant) {
    case "sticky":
      return (
        <span
          aria-hidden
          className={`${FACE} ${shadow} rounded-[1px]`}
          style={{
            ...HIDE_BACKFACE,
            background:
              "radial-gradient(circle at 100% 100%, rgba(120,80,0,0.16), transparent 45%), linear-gradient(to bottom, rgba(120,90,0,0.09) 0 14%, transparent 14%), linear-gradient(160deg, #fff7a8 0%, #fde047 70%, #facc15 100%)",
          }}
        >
          <FrontLabel
            number={number}
            label={blurb.label}
            Icon={Icon}
            tone={{ number: "text-amber-800/70", label: "text-stone-800", icon: "text-amber-700/80" }}
          />
        </span>
      );
    case "polaroid":
      return (
        <span aria-hidden className={`${FACE} ${shadow} bg-[#f7f5ef]`} style={HIDE_BACKFACE}>
          {/* washi tape */}
          <span
            className="absolute left-1/2 top-0 z-10 block h-[11cqw] w-[38cqw] -translate-x-1/2 -translate-y-1/2 -rotate-3"
            style={{
              background:
                "repeating-linear-gradient(45deg, rgba(251,191,36,0.55) 0 4px, rgba(253,230,138,0.55) 4px 8px)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          />
          {/* padding lives on this inner span: cqw on the face itself would resolve against the
              page rather than the card, since the face is the container */}
          <span className="relative flex h-full flex-col px-[6cqw] pt-[6cqw]">
            <span
              className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 28% 26%, #fde68a 0 11%, transparent 12%), linear-gradient(170deg, #7dd3fc 0%, #f9a8d4 58%, #fdba74 100%)",
                boxShadow: "inset 0 0 14px rgba(0,0,0,0.35)",
              }}
            >
              <Icon fill="currentColor" strokeWidth={1.5} className="size-[26cqw] text-white/85 drop-shadow" />
            </span>
            <span className="flex h-[26%] shrink-0 items-center justify-between gap-[2cqw]">
              <span className="a6 text-[length:10cqw] font-bold leading-tight text-slate-700">{blurb.label}</span>
              <span className="a6 shrink-0 whitespace-nowrap text-[length:max(0.625rem,6cqw)] tracking-wider text-slate-500">{number}</span>
            </span>
          </span>
        </span>
      );
    case "kraft":
      return (
        <span
          aria-hidden
          className={`${FACE} ${shadow}`}
          style={{
            ...HIDE_BACKFACE,
            backgroundColor: "#cfa972",
            backgroundImage:
              "radial-gradient(rgba(90,60,25,0.22) 0.6px, transparent 1px), radial-gradient(rgba(255,240,210,0.2) 0.6px, transparent 1px), linear-gradient(170deg, rgba(255,255,255,0.14), rgba(0,0,0,0.1))",
            backgroundSize: "5px 5px, 7px 7px, 100% 100%",
            backgroundPosition: "0 0, 2px 3px, 0 0",
          }}
        >
          <span className="absolute inset-[4cqw] block rounded-[2px] border border-dashed border-amber-950/35" />
          <FrontLabel
            number={number}
            label={blurb.label}
            Icon={Icon}
            tone={{ number: "text-amber-950/60", label: "text-amber-950", icon: "text-amber-900/70" }}
          />
        </span>
      );
    case "graph":
      return (
        <span aria-hidden className={`${FACE} ${shadow} bg-[#eef6ff]`} style={HIDE_BACKFACE}>
          <span
            className="absolute inset-0 block rounded-[inherit]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.18) 1px, transparent 1px)",
              backgroundSize: "7cqw 7cqw",
            }}
          />
          <FrontLabel
            number={number}
            label={blurb.label}
            Icon={Icon}
            tone={{ number: "text-blue-800/60", label: "text-slate-800", icon: "text-blue-700/70" }}
          />
        </span>
      );
    case "index":
    default:
      return (
        <span aria-hidden className={`${FACE} ${shadow} bg-[#fffdf6]`} style={HIDE_BACKFACE}>
          <span
            className="absolute inset-0 block rounded-[inherit]"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent 0 24%, rgba(220,38,38,0.5) 24% calc(24% + 1.5px), transparent calc(24% + 1.5px)), linear-gradient(to bottom, #fffdf6 0 24%, transparent 24%), repeating-linear-gradient(to bottom, transparent 0 calc(10cqw - 1px), rgba(59,130,246,0.22) calc(10cqw - 1px) 10cqw)",
            }}
          />
          <FrontLabel
            number={number}
            label={blurb.label}
            Icon={Icon}
            tone={{ number: "text-red-700/70", label: "text-slate-800", icon: "text-slate-500" }}
          />
        </span>
      );
  }
}

// What a pinned note shows on its back (seen only mid-flip while it flies home).
function PinnedBack({ blurb }) {
  return (
    <span aria-hidden className={`${FACE} ${FACE_SHADOW_PINNED} bg-[#fdfbf3]`} style={BACK_FACE}>
      <span className="a6 flex h-full items-center justify-center p-[8cqw] text-center text-[length:10cqw] font-bold text-slate-800">
        {blurb.title}
      </span>
    </span>
  );
}

function PinnedNote({ blurb, note, number, layoutId, returning, onReturned }) {
  return (
    <motion.span
      layoutId={layoutId}
      layoutCrossfade={false}
      transition={{ layout: FLIP }}
      onLayoutAnimationComplete={onReturned}
      className={`${SLOT_BOX} z-[1] block`}
      style={{ rotate: note.tilt }}
    >
      <motion.span
        className="grid h-full grid-rows-[minmax(0,1fr)] [grid-template-areas:'card']"
        style={{ transformStyle: "preserve-3d", transformPerspective: 1200 }}
        initial={{ rotateY: returning ? 180 : 0 }}
        animate={{ rotateY: 0 }}
        transition={FLIP}
      >
        <NoteFront blurb={blurb} note={note} number={number} />
        <PinnedBack blurb={blurb} />
      </motion.span>
    </motion.span>
  );
}

function OpenNote({ blurb, note, number, layoutId, onClose, reduceMotion }) {
  const closeRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      layoutId={layoutId}
      layoutCrossfade={false}
      transition={{ layout: FLIP, opacity: { duration: 0.2 } }}
      initial={reduceMotion ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      role="region"
      aria-labelledby={titleId}
      data-note
      className="pointer-events-auto flex max-h-full min-h-[15rem] w-full flex-col [grid-area:1/1] sm:min-h-[17rem] sm:max-w-[34rem] lg:max-w-[36rem] 2xl:max-w-[40rem]"
      style={{ rotate: 0 }}
    >
      <motion.div
        className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)] [grid-template-areas:'card']"
        style={{ transformStyle: "preserve-3d", transformPerspective: 1400 }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 180 }}
        transition={FLIP}
      >
        <NoteFront blurb={blurb} note={note} number={number} lifted />

        <div
          className={`[grid-area:card] relative flex min-h-0 flex-col overflow-y-auto rounded-[3px] bg-[#fdfbf3] p-4 text-left sm:p-7 ${FACE_SHADOW_LIFTED}`}
          style={BACK_FACE}
        >
          {/* hole where the pin was */}
          <span
            aria-hidden
            className="absolute left-1/2 top-2 block size-1.5 -translate-x-1/2 rounded-full bg-stone-500/60 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"
          />
          <div className="flex items-start gap-3 border-b-2 border-red-400/60 pb-2 sm:pb-3">
            <div className="min-w-0 flex-1">
              <p className="a6 text-[0.7rem] uppercase tracking-[0.3em] text-red-700/80 sm:text-xs">
                {number} &middot; {blurb.label}
              </p>
              <h3 id={titleId} className="a6 text-2xl font-bold text-slate-900 sm:text-3xl">
                {blurb.title}
              </h3>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={`Pin "${blurb.label}" back on the board`}
              className="-mr-1 -mt-1 shrink-0 cursor-pointer rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-900/10 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <div className={`a6 mt-3 flex-1 leading-[1.6] text-slate-800 sm:mt-4 ${note.backText}`} style={RULED}>
            {blurb.body}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Corkboard({ className = "" }) {
  const uid = useId();
  const panelId = `${uid}-panel`;
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState(null);
  // The note flying back to its slot; lifted above the overlay until it lands.
  const [returningId, setReturningId] = useState(null);
  const triggerRefs = useRef({});

  const close = useCallback(
    (restoreFocus) => {
      if (openId == null) return;
      setReturningId(openId);
      setOpenId(null);
      if (restoreFocus) triggerRefs.current[openId]?.focus({ preventScroll: true });
    },
    [openId]
  );

  const toggle = (id) => {
    if (openId === id) {
      close(true);
      return;
    }
    // If another note is open it flies home; otherwise clear any stale lift.
    setReturningId(openId);
    setOpenId(id);
  };

  useEffect(() => {
    if (openId == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, close]);

  const onBoardClick = (e) => {
    if (openId != null && !e.target.closest("[data-note]")) close(false);
  };

  const openIndex = blurbs.findIndex((b) => b.id === openId);
  const openBlurb = openIndex >= 0 ? blurbs[openIndex] : null;

  return (
    <MotionConfig reducedMotion="user">
      <div className={`w-full ${className}`}>
        {/* frame */}
        <div className="rounded-md p-2 sm:p-3" style={FRAME_STYLE}>
          {/* cork */}
          <div
            className="relative grid h-[31rem] grid-cols-2 grid-rows-3 gap-x-3 gap-y-4 rounded-sm p-4 sm:h-[28rem] sm:grid-cols-6 sm:grid-rows-2 sm:gap-x-4 sm:gap-y-6 sm:px-8 sm:py-7 lg:h-[32rem] 2xl:h-[34rem]"
            style={CORK_STYLE}
            onClick={onBoardClick}
          >
            {blurbs.map((blurb, i) => {
              const note = NOTES[blurb.id] ?? FALLBACK_NOTE;
              const isOpen = openId === blurb.id;
              const dimmed = openId != null && !isOpen;
              const number = `No. ${String(i + 1).padStart(2, "0")}`;
              const layoutId = `${uid}-note-${blurb.id}`;
              return (
                <button
                  key={blurb.id}
                  ref={(el) => {
                    triggerRefs.current[blurb.id] = el;
                  }}
                  type="button"
                  data-note
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={blurb.label}
                  onClick={() => toggle(blurb.id)}
                  className={`group relative h-full min-h-0 w-full cursor-pointer rounded-sm transition-[filter] duration-300 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-300 motion-reduce:transition-none ${
                    dimmed ? "brightness-75 saturate-75" : ""
                  } ${returningId === blurb.id ? "z-30" : ""} ${SLOT_CLASSES[i] ?? ""}`}
                >
                  {/* sun-faded patch + pin left behind while the note is unpinned */}
                  <span aria-hidden className={`${SLOT_BOX} block`} style={{ rotate: `${note.tilt}deg` }}>
                    {isOpen && (
                      <span className="absolute inset-0 block rounded-[3px] border border-dashed border-amber-950/25 bg-[#e2bd8c]/45" />
                    )}
                  </span>

                  <AnimatePresence initial={false}>
                    {!isOpen && (
                      <PinnedNote
                        key="note"
                        blurb={blurb}
                        note={note}
                        number={number}
                        layoutId={layoutId}
                        returning={returningId === blurb.id}
                        onReturned={() => setReturningId((r) => (r === blurb.id ? null : r))}
                      />
                    )}
                  </AnimatePresence>

                  {/* pins sit above the note */}
                  {note.pin && (
                    <span aria-hidden className={`${SLOT_BOX} pointer-events-none z-10 block`} style={{ rotate: `${note.tilt}deg` }}>
                      <span className="absolute inset-x-0 top-1.5 block sm:top-2">
                        <Pin color={note.pin} />
                      </span>
                    </span>
                  )}
                </button>
              );
            })}

            {/* the unpinned, flipped note */}
            <div
              id={panelId}
              className="pointer-events-none absolute inset-0 z-20 grid grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] place-items-center p-3 sm:p-6"
            >
              <AnimatePresence>
                {openBlurb && (
                  <OpenNote
                    key={openBlurb.id}
                    blurb={openBlurb}
                    note={NOTES[openBlurb.id] ?? FALLBACK_NOTE}
                    number={`No. ${String(openIndex + 1).padStart(2, "0")}`}
                    layoutId={`${uid}-note-${openBlurb.id}`}
                    onClose={() => close(true)}
                    reduceMotion={reduceMotion}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="a6 mt-3 text-center text-xs text-slate-400 sm:text-sm">
          Click a note to unpin it
        </p>
      </div>
    </MotionConfig>
  );
}
