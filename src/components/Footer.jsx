/**
 * Footer — minimal bar with copyright, stack credit, and back-to-top button.
 */
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800/80">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 lg:px-8">

        {/* Copyright */}
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-zinc-600 dark:text-zinc-400">Samin Safwan</span>
          . All rights reserved.
        </p>

        {/* Tagline — hidden on small screens */}
        <p className="hidden text-xs text-zinc-400 dark:text-zinc-500 sm:block">
          Designed & built with{" "}
          <span className="text-zinc-600 dark:text-zinc-400">React</span>{" "}
          +{" "}
          <span className="text-zinc-600 dark:text-zinc-400">Tailwind CSS</span>
        </p>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll back to top"
          className="
            inline-flex h-8 w-8 items-center justify-center rounded-full
            border border-zinc-200 text-zinc-500
            transition-all duration-200
            hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-900
            dark:border-zinc-700 dark:text-zinc-400
            dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-100
          "
        >
          <ArrowUp size={13} />
        </button>

      </div>
    </footer>
  );
}
