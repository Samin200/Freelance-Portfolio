/**
 * Projects — featured work cards with image zoom, gradient overlay,
 * per-project accent colour, tech pills, and dual action links.
 * Projects are loaded from the API; falls back to static data if unavailable.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { projects as staticProjects } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  const [projects, setProjects] = useState(staticProjects);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Only show visible projects; map _id to id for key
          const visible = data
            .filter((p) => p.visible !== false)
            .map((p) => ({ ...p, id: p._id }));
          setProjects(visible);
        }
      })
      .catch(() => {/* silently use static data */});
  }, []);

  return (
    <section id="projects" className="px-6 py-28 lg:px-8">
      {/* Section divider */}
      <div className="mx-auto mb-20 w-full max-w-6xl">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            label="Projects"
            title="Things I have built"
            description="A small collection of projects I built to practice my skills and explore new ideas."
          />

          {/* All projects link */}
          <motion.a
            href="https://github.com/Samin200?tab=repositories"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:flex"
          >
            All on GitHub
            <ArrowUpRight
              size={13}
              className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </div>

        {/* ── Project card grid ── */}
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id || project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="
                group flex flex-col overflow-hidden rounded-2xl
                border border-zinc-100 bg-white
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-zinc-200/70
                dark:border-zinc-800 dark:bg-zinc-900
                dark:hover:shadow-zinc-950
              "
            >
              {/* ── Image block ── */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                )}

                {/* Bottom-up gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-zinc-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Per-project accent glow */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${project.accent || "from-blue-500/20 to-violet-500/20"}`} />

                {/* Live demo pill — appears on hover */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} — open live demo`}
                    className="
                      absolute right-3 top-3
                      flex items-center gap-1.5
                      rounded-full bg-white/90 px-3 py-1.5
                      text-xs font-semibold text-zinc-800
                      opacity-0 shadow-md backdrop-blur-sm
                      transition-all duration-200
                      hover:bg-white
                      group-hover:opacity-100
                      dark:bg-zinc-900/90 dark:text-zinc-100 dark:hover:bg-zinc-800
                    "
                  >
                    Live <ArrowUpRight size={11} />
                  </a>
                )}
              </div>

              {/* ── Content block ── */}
              <div className="flex flex-1 flex-col gap-3.5 p-5">
                {/* Title */}
                <h3 className="text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {project.summary}
                </p>

                {/* Tech stack pills */}
                {project.tech && project.tech.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5 pt-0.5" aria-label="Tech stack">
                    {project.tech.map((item) => (
                      <li
                        key={item}
                        className="
                          rounded-full
                          border border-zinc-100 bg-zinc-50
                          px-2.5 py-0.5
                          text-[0.68rem] font-medium text-zinc-500
                          dark:border-zinc-700/50 dark:bg-zinc-800/60 dark:text-zinc-400
                        "
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Divider */}
                <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

                {/* Action row */}
                <div className="flex items-center justify-between">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        group/link inline-flex items-center gap-1.5
                        text-xs font-semibold text-zinc-800
                        transition-colors hover:text-blue-600
                        dark:text-zinc-200 dark:hover:text-blue-400
                      "
                    >
                      Live Demo
                      <ArrowUpRight
                        size={12}
                        className="transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </a>
                  ) : <span />}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex items-center gap-1.5
                        text-xs font-medium text-zinc-400
                        transition-colors hover:text-zinc-900
                        dark:text-zinc-500 dark:hover:text-zinc-100
                      "
                    >
                      <GitBranch size={12} strokeWidth={1.75} />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
