import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fast Generation",
    desc: "Images in seconds using local GPU acceleration.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "10+ Art Styles",
    desc: "From photorealistic to pixel art — just describe it.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "100% Private",
    desc: "Your prompts and images never leave your machine.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "Fine Control",
    desc: "Tune steps, CFG, seed, aspect ratio, and more.",
  },
];

const EXAMPLE_PROMPTS = [
  "Cyberpunk city at night",
  "Astronaut in alien jungle",
  "Abstract watercolor galaxy",
  "Cozy mountain cabin",
  "Futuristic robot in a café",
  "Ancient temple at golden hour",
];

export default function Home({ onMenuClick }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">

      {/* Mobile-only top bar */}
      <header className="flex items-center gap-3 px-4 h-14 border-b border-zinc-800 flex-shrink-0 lg:hidden">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-sm">
          <span className="text-violet-400">✦</span> DreamGen
        </span>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-3xl w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-950/60 border border-violet-800/40 text-violet-400 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Stable Diffusion · Runs Locally
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Create stunning images{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              with words
            </span>
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Describe any scene in plain English and watch AI bring it to life in seconds.
            No design skills required.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-3 justify-center flex-wrap mb-12">
            <Link
              to="/generate"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-7 py-3 rounded-xl transition-colors shadow-lg shadow-violet-900/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
              Start Generating
            </Link>
            <Link
              to="/gallery"
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold px-7 py-3 rounded-xl transition-colors border border-zinc-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              View Gallery
            </Link>
          </div>

          {/* Quick-start prompts */}
          <div className="flex flex-wrap gap-2 justify-center mb-16">
            {EXAMPLE_PROMPTS.map((p) => (
              <Link
                key={p}
                to="/generate"
                state={{ prompt: p }}
                className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-full text-xs text-zinc-500 hover:text-zinc-200 transition-all"
              >
                {p}
              </Link>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 text-left transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center mb-3">
                  {icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
