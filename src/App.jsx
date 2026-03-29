/**
 * App — root component.
 * Manages theme state, renders layout, and drives the scroll-progress bar.
 */
import { useEffect, useRef, useState } from "react";
import { Navbar }   from "./components/Navbar";
import { Hero }     from "./components/Hero";
import { About }    from "./components/About";
import { Skills }   from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact }  from "./components/Contact";
import { Footer }   from "./components/Footer";

/* ── Read preferred theme from localStorage or OS preference ── */
function getPreferredTheme() {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme]   = useState(() => getPreferredTheme());
  const progressRef         = useRef(null);

  /* ── Sync <html> class + localStorage ── */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ── Scroll-progress bar ── */
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = scrollHeight === clientHeight
        ? 0
        : scrollTop / (scrollHeight - clientHeight);
      bar.style.transform = `scaleX(${pct})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">

      {/* ── Scroll progress bar ── */}
      <div
        ref={progressRef}
        aria-hidden
        style={{ transform: "scaleX(0)" }}
        className="
          fixed left-0 top-0 z-[60]
          h-[2px] w-full origin-left
          bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500
          opacity-70
        "
      />

      {/* ── Navigation ── */}
      <Navbar isDark={theme === "dark"} onToggleTheme={toggleTheme} />

      {/* ── Page sections ── */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
