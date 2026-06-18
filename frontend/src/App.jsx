import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Gallery from "./pages/Gallery";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Open sidebar by default on desktop
  useEffect(() => {
    if (window.innerWidth >= 1024) setSidebarOpen(true);
  }, []);

  const toggleSidebar = () => setSidebarOpen((v) => !v);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0 overflow-hidden flex flex-col">
          <Routes>
            <Route path="/"        element={<Home     onMenuClick={toggleSidebar} />} />
            <Route path="/generate" element={<Generate onMenuClick={toggleSidebar} />} />
            <Route path="/gallery"  element={<Gallery  onMenuClick={toggleSidebar} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
