/**
 * ThemeToggle — animated Sun ↔ Moon swap button.
 * Smooth icon transition using Framer Motion's AnimatePresence.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

/**
 * @param {{ isDark: boolean, onToggle: () => void }} props
 */
export function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        relative inline-flex h-9 w-9 items-center justify-center
        overflow-hidden rounded-full
        border border-zinc-200 bg-white
        text-zinc-500 shadow-sm
        transition-all duration-200
        hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 hover:shadow
        dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400
        dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-100
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ y: -16, opacity: 0, rotate: -60 }}
          animate={{ y: 0,   opacity: 1, rotate: 0   }}
          exit={{    y: 16,  opacity: 0, rotate:  60 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {isDark
            ? <Moon size={14} strokeWidth={1.75} />
            : <Sun  size={14} strokeWidth={1.75} />
          }
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
