/**
 * Navbar — sticky, scroll-aware header.
 * Features: spring-animated active pill, mobile drawer,
 * body-scroll lock, and outside-click close.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "../data/portfolio";
import { ThemeToggle } from "./ThemeToggle";

/**
 * @param {{ isDark: boolean, onToggleTheme: () => void }} props
 */
export function Navbar({ isDark, onToggleTheme }) {
  const [activeHash, setActiveHash]   = useState("");
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const mobileMenuRef                 = useRef(null);

  /* ── Scroll depth → glass background ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active-section highlight via IntersectionObserver ── */
  useEffect(() => {
    const ids      = navItems.map((item) => item.href.slice(1));
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) setActiveHash(`#${visible[0].target.id}`);
      },
      { threshold: 0.25, rootMargin: "-64px 0px -40% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Outside-click closes mobile menu ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  /* ── Body-scroll lock while drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/50 bg-white/80 shadow-sm backdrop-blur-2xl dark:border-zinc-800/50 dark:bg-zinc-950/85"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">

        {/* ── Wordmark / Logo ── */}
        <a
          href="#home"
          className="group flex items-center gap-2"
          aria-label="Samin Safwan — back to top"
        >
          {/* Geometric monogram */}
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950">
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M10.5 4.5C10.5 3.1 9.1 2 7 2C4.9 2 3.5 3.1 3.5 4.5C3.5 5.9 4.9 6.5 7 7C9.1 7.5 10.5 8.1 10.5 9.5C10.5 10.9 9.1 12 7 12C4.9 12 3.5 10.9 3.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</span>
          <span className="text-[0.72rem] font-bold tracking-[0.18em] text-zinc-700 uppercase transition-colors group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-zinc-50">
            Samin Safwan
          </span>
        </a>

        {/* ── Desktop nav links ── */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-zinc-950 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-zinc-100 dark:bg-zinc-800/80"
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

          {/* Hire Me — desktop CTA */}
          <a
            href="#contact"
            className="hidden rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300 sm:inline-flex"
          >
            Hire Me
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="
              inline-flex h-9 w-9 items-center justify-center rounded-full
              border border-zinc-200 text-zinc-600
              transition-colors hover:border-zinc-400 hover:text-zinc-900
              dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100
              md:hidden
            "
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y:  0 }}
            exit={{    opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute inset-x-0 top-16 z-40
              border-b border-zinc-200/60 bg-white/96 px-6 py-4
              backdrop-blur-2xl
              dark:border-zinc-800/60 dark:bg-zinc-950/96
              md:hidden
            "
          >
            <ul className="flex flex-col gap-0.5">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x:   0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      activeHash === item.href
                        ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}

              {/* Mobile hire-me CTA */}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x:   0 }}
                transition={{ delay: navItems.length * 0.05 + 0.05 }}
                className="pt-2"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-950"
                >
                  Hire Me
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
