import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ALL_STYLES = [
  "All", "Photorealistic", "Cinematic", "Anime", "Oil Painting",
  "Watercolor", "Illustration", "Pixel Art", "3D Render", "Sketch", "None",
];

/* ── Lightbox ── */
function Lightbox({ item, onClose, onDelete }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 rounded-2xl border border-zinc-800 max-w-2xl w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.url}
          alt={item.prompt}
          className="w-full max-h-[65vh] object-contain bg-black"
        />
        <div className="p-4">
          <p className="text-zinc-200 text-sm leading-relaxed mb-2">{item.prompt}</p>
          <div className="flex gap-2 flex-wrap mb-4">
            {item.style && item.style !== "None" && (
              <span className="text-[10px] text-violet-400 bg-violet-900/30 border border-violet-800/40 px-2 py-0.5 rounded-md">
                {item.style}
              </span>
            )}
            {item.aspectRatio && (
              <span className="text-[10px] text-zinc-500 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-md">
                {item.aspectRatio}
              </span>
            )}
            {item.createdAt && (
              <span className="text-[10px] text-zinc-600 px-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => onDelete(item.id)}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
            <div className="flex gap-4">
              <a
                href={item.url}
                download="ai-generated.png"
                className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                Download
              </a>
              <button onClick={onClose} className="text-sm text-zinc-500 hover:text-white transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyGallery() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-24">
      <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
        <svg className="w-10 h-10 text-zinc-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M21 3H3m0 18V3" />
        </svg>
      </div>
      <div>
        <h2 className="text-zinc-200 font-semibold text-lg mb-1">No images yet</h2>
        <p className="text-zinc-500 text-sm">Images you generate will appear here automatically.</p>
      </div>
      <Link
        to="/generate"
        className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm rounded-xl transition-colors"
      >
        Start Generating
      </Link>
    </div>
  );
}

/* ── Main ── */
export default function Gallery({ onMenuClick }) {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gallery") || "[]");
    setImages(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = images.filter((img) => img.id !== id);
    setImages(updated);
    localStorage.setItem("gallery", JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  const handleClearAll = () => {
    if (!window.confirm("Delete all images from the gallery?")) return;
    localStorage.removeItem("gallery");
    setImages([]);
    setSelected(null);
  };

  // Only show style filters that exist in the current gallery
  const availableStyles = ALL_STYLES.filter(
    (s) => s === "All" || images.some((img) => img.style === s)
  );

  const filtered = filter === "All" ? images : images.filter((img) => img.style === filter);

  return (
    <div className="flex flex-col h-full">

      {/* ── Top bar ── */}
      <header className="flex items-center gap-3 px-4 h-14 border-b border-zinc-800 flex-shrink-0 bg-zinc-950/80 backdrop-blur-sm">
        <button
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <span className="text-sm font-semibold text-zinc-200">Gallery</span>

        {images.length > 0 && (
          <span className="text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-md tabular-nums">
            {images.length}
          </span>
        )}

        <div className="flex-1" />

        {images.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-red-500 hover:text-red-400 transition-colors"
          >
            Clear all
          </button>
        )}
      </header>

      {/* ── Style filter bar ── */}
      {images.length > 0 && (
        <div className="flex gap-2 px-4 py-2.5 border-b border-zinc-800 overflow-x-auto flex-shrink-0 scrollbar-none">
          {availableStyles.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={[
                "flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                filter === s
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Grid ── */}
      <div className="flex-1 overflow-y-auto p-4">
        {images.length === 0 ? (
          <EmptyGallery />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-16">
            <p className="text-zinc-500 text-sm">No images with style "{filter}"</p>
            <button
              onClick={() => setFilter("All")}
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              Show all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filtered.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelected(img)}
                className="group relative aspect-square bg-zinc-800 rounded-xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-violet-500/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-900/20"
              >
                <img
                  src={img.url}
                  alt={img.prompt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-xs text-zinc-200 line-clamp-2 leading-relaxed">{img.prompt}</p>
                  {img.style && img.style !== "None" && (
                    <span className="mt-1 text-[10px] text-violet-400">{img.style}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <Lightbox item={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />
      )}
    </div>
  );
}
