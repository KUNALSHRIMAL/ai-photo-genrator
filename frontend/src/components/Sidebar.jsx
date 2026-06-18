import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV = [
  {
    to: "/",
    label: "Home",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-8l2 2" />
      </svg>
    ),
  },
  {
    to: "/generate",
    label: "Generate",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    to: "/gallery",
    label: "Gallery",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Refresh history every time the sidebar opens
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("promptHistory") || "[]");
    setHistory(stored);
  }, [isOpen]);

  const clearHistory = () => {
    localStorage.removeItem("promptHistory");
    setHistory([]);
  };

  const useHistoryPrompt = (prompt) => {
    navigate("/generate", { state: { prompt } });
    onClose();
  };

  return (
    <aside
      className={[
        "fixed lg:static inset-y-0 left-0 z-30",
        "w-64 flex flex-col flex-shrink-0",
        "bg-zinc-900 border-r border-zinc-800",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      ].join(" ")}
    >
      {/* Logo row */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-zinc-800 flex-shrink-0">
        <NavLink to="/" onClick={onClose} className="flex items-center gap-2.5 font-bold text-base tracking-tight">
          <span className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-black">
            ✦
          </span>
          <span className="text-white">DreamGen</span>
        </NavLink>
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="lg:hidden w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-2 pt-3 pb-2 flex-shrink-0">
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800",
              ].join(" ")
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 border-t border-zinc-800 my-1" />

      {/* Prompt History */}
      <div className="flex-1 flex flex-col overflow-hidden px-2 py-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
            Recent Prompts
          </span>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-0.5">
          {history.length === 0 ? (
            <p className="text-xs text-zinc-600 px-2 py-4 text-center leading-relaxed">
              Your recent prompts<br />will appear here
            </p>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => useHistoryPrompt(item.prompt)}
                title={item.prompt}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors leading-relaxed line-clamp-2"
              >
                {item.prompt}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Bottom branding */}
      <div className="px-4 py-3 border-t border-zinc-800 flex-shrink-0">
        <p className="text-[10px] text-zinc-700 text-center">
          Powered by Stable Diffusion
        </p>
      </div>
    </aside>
  );
}
