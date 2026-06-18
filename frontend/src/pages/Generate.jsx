import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SettingsPanel from "../components/SettingsPanel";
import ImagePreview from "../components/ImagePreview";

const API_BASE = "http://127.0.0.1:8000";

const DEFAULT_SETTINGS = {
  aspectRatio: "1:1",
  style: "None",
  steps: 30,
  cfgScale: 7,
  seed: "",
  negativePrompt: "",
};

const SUGGESTIONS = [
  "A neon-lit cyberpunk city at night, rain reflections, cinematic",
  "Portrait of an astronaut exploring an alien jungle, photorealistic 8K",
  "Abstract swirling galaxy made of watercolors and soft light",
  "A cozy cabin in snowy mountains at dusk, warm light from inside",
  "Futuristic robot playing chess in a dimly lit café, cinematic shot",
  "Ancient Greek temple at golden hour, volumetric fog, epic scale",
];

function savePromptHistory(prompt) {
  const prev = JSON.parse(localStorage.getItem("promptHistory") || "[]");
  const deduped = prev.filter((e) => e.prompt !== prompt);
  localStorage.setItem(
    "promptHistory",
    JSON.stringify([{ id: Date.now(), prompt }, ...deduped].slice(0, 30))
  );
}

function saveToGallery(imageUrl, prompt, settings) {
  const prev = JSON.parse(localStorage.getItem("gallery") || "[]");
  localStorage.setItem(
    "gallery",
    JSON.stringify([
      {
        id: Date.now(),
        url: imageUrl,
        prompt,
        style: settings.style,
        aspectRatio: settings.aspectRatio,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  );
}

export default function Generate({ onMenuClick }) {
  const location = useLocation();
  const textareaRef = useRef(null);

  const [prompt, setPrompt] = useState(location.state?.prompt ?? "");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Fill prompt when navigating from history or home suggestions
  useEffect(() => {
    if (location.state?.prompt) {
      setPrompt(location.state.prompt);
      textareaRef.current?.focus();
    }
  }, [location.state]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setImage(null);

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt, ...settings }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      const url = data.image_url || data.image;
      setImage(url);
      savePromptHistory(prompt);
      saveToGallery(url, prompt, settings);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  // Active setting badges shown above prompt
  const activeBadges = [
    settings.aspectRatio !== "1:1" && settings.aspectRatio,
    settings.style !== "None" && settings.style,
  ].filter(Boolean);

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

        <span className="text-sm font-semibold text-zinc-200">Generate</span>

        <div className="flex-1" />

        {/* Settings toggle */}
        <button
          onClick={() => setSettingsOpen((v) => !v)}
          className={[
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            settingsOpen
              ? "bg-violet-600 text-white"
              : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700",
          ].join(" ")}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Settings
        </button>
      </header>

      {/* ── Content row ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Image area */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 gap-6">
          <ImagePreview
            image={image}
            isLoading={isLoading}
            prompt={prompt}
            error={error}
            onRetry={handleGenerate}
            aspectRatio={settings.aspectRatio}
            onSuggest={(p) => { setPrompt(p); textareaRef.current?.focus(); }}
            suggestions={SUGGESTIONS}
          />
        </div>

        {/* Settings panel — right drawer */}
        {settingsOpen && (
          <>
            {/* Mobile overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSettingsOpen(false)}
            />
            <aside className="fixed lg:relative right-0 top-14 bottom-0 z-40 lg:z-auto w-72 flex flex-col bg-zinc-900 border-l border-zinc-800 flex-shrink-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 flex-shrink-0">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
                  Generation Settings
                </span>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="w-6 h-6 flex items-center justify-center rounded text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <SettingsPanel settings={settings} onChange={setSettings} />
              </div>
            </aside>
          </>
        )}
      </div>

      {/* ── Prompt bar ── */}
      <div className="border-t border-zinc-800 bg-zinc-900/70 backdrop-blur-sm px-4 py-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto">

          {/* Active setting badges */}
          {activeBadges.length > 0 && (
            <div className="flex gap-2 mb-2 flex-wrap">
              {activeBadges.map((b) => (
                <span key={b} className="text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded-md">
                  {b}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3">
            {/* Textarea */}
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                rows={3}
                placeholder="Describe the image you want to create…"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKey}
                disabled={isLoading}
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-xl px-4 py-3 pr-10 text-sm text-white placeholder-zinc-600 resize-none focus:outline-none transition-colors disabled:opacity-50 leading-relaxed"
              />
              {prompt && !isLoading && (
                <button
                  onClick={() => { setPrompt(""); setImage(null); setError(null); }}
                  className="absolute top-3 right-3 text-zinc-600 hover:text-zinc-400 transition-colors"
                  title="Clear"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              title="Generate (Enter)"
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:cursor-not-allowed transition-colors shadow-lg shadow-violet-900/30"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                </svg>
              )}
            </button>
          </div>

          <p className="text-[10px] text-zinc-700 mt-2 text-center">
            Enter to generate · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
