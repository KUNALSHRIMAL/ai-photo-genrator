const ASPECT_RATIOS = [
  { id: "1:1",  label: "1:1",  desc: "Square",   w: 28, h: 28 },
  { id: "16:9", label: "16:9", desc: "Wide",      w: 36, h: 20 },
  { id: "9:16", label: "9:16", desc: "Portrait",  w: 20, h: 36 },
  { id: "4:3",  label: "4:3",  desc: "Photo",     w: 32, h: 24 },
  { id: "3:2",  label: "3:2",  desc: "Film",      w: 33, h: 22 },
];

const STYLES = [
  "None",
  "Photorealistic",
  "Cinematic",
  "Anime",
  "Oil Painting",
  "Watercolor",
  "Illustration",
  "Pixel Art",
  "3D Render",
  "Sketch",
];

export default function SettingsPanel({ settings, onChange }) {
  const set = (key, value) => onChange({ ...settings, [key]: value });

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-4 space-y-6">

        {/* ── Aspect Ratio ── */}
        <section>
          <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {ASPECT_RATIOS.map(({ id, label, desc, w, h }) => {
              const active = settings.aspectRatio === id;
              return (
                <button
                  key={id}
                  onClick={() => set("aspectRatio", id)}
                  title={desc}
                  className={[
                    "flex flex-col items-center gap-1.5 py-2 px-1 rounded-lg border transition-all",
                    active
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/40",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "rounded border-2 transition-colors",
                      active ? "border-violet-400" : "border-zinc-500",
                    ].join(" ")}
                    style={{ width: w + "px", height: h + "px" }}
                  />
                  <span className={`text-[10px] font-medium ${active ? "text-violet-300" : "text-zinc-500"}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Style ── */}
        <section>
          <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">
            Image Style
          </label>
          <div className="flex flex-wrap gap-1.5">
            {STYLES.map((style) => {
              const active = settings.style === style;
              return (
                <button
                  key={style}
                  onClick={() => set("style", style)}
                  className={[
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    active
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700",
                  ].join(" ")}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Steps ── */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
              Steps
            </label>
            <span className="text-xs font-semibold text-zinc-300 tabular-nums">{settings.steps}</span>
          </div>
          <input
            type="range"
            min={10}
            max={50}
            step={1}
            value={settings.steps}
            onChange={(e) => set("steps", Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-zinc-700 cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-zinc-600">10 · Fast</span>
            <span className="text-[10px] text-zinc-600">50 · Quality</span>
          </div>
        </section>

        {/* ── CFG Scale ── */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
              CFG Scale
            </label>
            <span className="text-xs font-semibold text-zinc-300 tabular-nums">{settings.cfgScale}</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={0.5}
            value={settings.cfgScale}
            onChange={(e) => set("cfgScale", Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-zinc-700 cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-zinc-600">Creative</span>
            <span className="text-[10px] text-zinc-600">Precise</span>
          </div>
        </section>

        {/* ── Seed ── */}
        <section>
          <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
            Seed
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Random"
              value={settings.seed}
              onChange={(e) => set("seed", e.target.value)}
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button
              onClick={() => set("seed", Math.floor(Math.random() * 999_999_999))}
              title="Random seed"
              className="px-3 py-2 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg text-sm transition-colors"
            >
              🎲
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-1">Leave blank for a random seed each time.</p>
        </section>

        {/* ── Negative Prompt ── */}
        <section>
          <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
            Negative Prompt
          </label>
          <textarea
            rows={3}
            placeholder="Things to avoid: blurry, watermark, low quality, distorted…"
            value={settings.negativePrompt}
            onChange={(e) => set("negativePrompt", e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-violet-500 transition-colors leading-relaxed"
          />
        </section>

      </div>
    </div>
  );
}
