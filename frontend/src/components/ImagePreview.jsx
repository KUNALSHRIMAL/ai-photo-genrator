/* Maps aspect-ratio setting ids to Tailwind classes */
const RATIO_CLASS = {
  "1:1":  "aspect-square",
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "4:3":  "aspect-[4/3]",
  "3:2":  "aspect-[3/2]",
};

/* ── Loading skeleton ── */
function LoadingState({ aspectRatio }) {
  return (
    <div className={`w-full max-w-lg ${RATIO_CLASS[aspectRatio] ?? "aspect-square"} bg-zinc-800/80 rounded-2xl border border-zinc-700 flex flex-col items-center justify-center gap-5`}>
      {/* Layered spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-zinc-700" />
        <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-t-fuchsia-400 animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
      </div>
      <div className="text-center">
        <p className="text-zinc-200 text-sm font-medium">Generating your image…</p>
        <p className="text-zinc-600 text-xs mt-1">Usually takes 10–30 seconds</p>
      </div>
    </div>
  );
}

/* ── Error card ── */
function ErrorState({ message, onRetry }) {
  return (
    <div className="w-full max-w-md bg-red-950/50 border border-red-800/60 rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
      <div className="w-12 h-12 rounded-full bg-red-900/60 flex items-center justify-center">
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <div>
        <p className="text-red-300 font-semibold mb-1">Generation failed</p>
        <p className="text-red-400/70 text-sm leading-relaxed">{message}</p>
        <p className="text-red-600/60 text-xs mt-2">Make sure the backend is running at port 8000</p>
      </div>
      <button
        onClick={onRetry}
        className="px-5 py-2 bg-red-800/50 hover:bg-red-700/60 text-red-200 rounded-lg text-sm font-medium transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

/* ── Empty / suggested prompts ── */
function EmptyState({ onSuggest, suggestions }) {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
      {/* Placeholder box */}
      <div className="w-full max-w-sm aspect-square rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center gap-3 bg-zinc-900/40">
        <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center">
          <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M21 3H3m0 18V3" />
          </svg>
        </div>
        <p className="text-zinc-600 text-sm">Your image will appear here</p>
      </div>

      {/* Suggested prompts */}
      {suggestions.length > 0 && (
        <div className="w-full">
          <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest text-center mb-3">
            Try a prompt
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestions.map((p, i) => (
              <button
                key={i}
                onClick={() => onSuggest(p)}
                className="text-left px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs text-zinc-500 hover:text-zinc-200 transition-all leading-relaxed line-clamp-2"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Generated image ── */
function ImageResult({ src, prompt }) {
  return (
    <div className="w-full max-w-lg flex flex-col gap-3">
      <div className="relative group rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl shadow-black/60">
        <img src={src} alt={prompt || "Generated"} className="w-full block" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-zinc-600 line-clamp-1 flex-1 mr-4">{prompt}</p>
        <a
          href={src}
          download="ai-generated.png"
          className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors flex-shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          Download
        </a>
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function ImagePreview({ image, isLoading, prompt, error, onRetry, aspectRatio = "1:1", onSuggest, suggestions = [] }) {
  if (isLoading) return <LoadingState aspectRatio={aspectRatio} />;
  if (error)     return <ErrorState message={error} onRetry={onRetry} />;
  if (image)     return <ImageResult src={image} prompt={prompt} />;
  return <EmptyState onSuggest={onSuggest} suggestions={suggestions} />;
}
