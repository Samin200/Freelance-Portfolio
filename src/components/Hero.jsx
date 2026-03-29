/**
 * Hero — opening section with availability badge, headline, bio, and CTAs.
 * Profile photo and availability badge are fetched dynamically from API.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const [settings, setSettings] = useState({ available: true, profilePhoto: "https://i.ibb.co.com/hFyt4Myd/flux-2-max-20251222-a-Enhance-this-portrai.jpg" });

 useEffect(() => {
  fetch(`${import.meta.env.VITE_API_BASE}/api/settings`)
    .then(res => res.json())
    .then(data => setSettings(data))
    .catch(() => setSettings({ available: true, profilePhoto: "https://i.ibb.co.com/hFyt4Myd/flux-2-max-20251222-a-Enhance-this-portrai.jpg" }));
}, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-32 pt-20 lg:px-8 lg:pb-44 lg:pt-36"
    >
      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.025] dark:opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-blue-400/10 to-violet-400/10 blur-[100px] dark:from-blue-500/10 dark:to-violet-500/10" />
        <div className="absolute -bottom-32 -left-32 h-[34rem] w-[34rem] rounded-full bg-gradient-to-tr from-violet-400/[8%] to-indigo-400/[8%] blur-[90px] dark:from-violet-500/10 dark:to-indigo-500/10" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:justify-between">
          {/* ── Left: text content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-7 md:max-w-[56%]"
          >
            {/* Availability badge */}
            {settings.available && (
              <motion.div variants={fadeUp}>
                <span
                  className="
                  inline-flex items-center gap-2.5 rounded-full
                  border border-emerald-200/80 bg-emerald-50
                  px-4 py-1.5 text-xs font-semibold text-emerald-700
                  shadow-sm shadow-emerald-100
                  dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:shadow-none
                "
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Available for new projects
                  <Sparkles
                    size={10}
                    className="text-emerald-500 dark:text-emerald-400"
                  />
                </span>
              </motion.div>
            )}

            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="text-[0.7rem] font-bold tracking-[0.28em] text-zinc-400 uppercase dark:text-zinc-500"
            >
              Freelance Web Developer
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="
                max-w-[20ch]
                text-[clamp(2.2rem,5.5vw,4rem)]
                font-semibold leading-[1.08] tracking-tight
                text-zinc-950 dark:text-zinc-50
              "
            >
              Hi, I'm Samin —{" "}
              <span className="italic text-zinc-400 dark:text-zinc-500">
                I build
              </span>{" "}
              clean, modern{" "}
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-400">
                websites.
              </span>
            </motion.h1>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="max-w-[50ch] text-base leading-relaxed text-zinc-500 dark:text-zinc-400"
            >
              I completed a 6-month web development course at Programming Hero,
              where I learned modern frontend development with React. I build my
              projects using React, Tailwind CSS, and an AI-assisted workflow —
              and I'm always improving.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href="#contact"
                className="
                  group relative inline-flex items-center gap-2
                  overflow-hidden rounded-full
                  bg-zinc-950 px-7 py-3
                  text-sm font-semibold text-white
                  shadow-lg shadow-zinc-900/20
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-900/30
                  dark:bg-zinc-50 dark:text-zinc-950 dark:shadow-zinc-900/40
                  dark:hover:bg-white
                "
              >
                <span
                  className="absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-500 group-hover:translate-x-full"
                  aria-hidden
                />
                Hire Me
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="#projects"
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-zinc-200 px-7 py-3
                  text-sm font-medium text-zinc-700
                  transition-all duration-200
                  hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950
                  dark:border-zinc-700 dark:text-zinc-300
                  dark:hover:border-zinc-500 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-50
                "
              >
                View Projects
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: profile photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-400/30 via-violet-400/20 to-transparent blur-xl dark:from-blue-500/20" />
              {/* Profile photo */}
              <div className="relative h-52 w-52 overflow-hidden rounded-full border-2 border-zinc-100 shadow-2xl shadow-zinc-200/60 dark:border-zinc-800 dark:shadow-zinc-900/60 md:h-64 md:w-64">
                <img
                  src={
                    settings.profilePhoto ||
                    "https://i.ibb.co.com/hFyt4Myd/flux-2-max-20251222-a-Enhance-this-portrai.jpg"
                  }
                  alt="Samin Safwan — Frontend Developer"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              {/* Small floating badge */}
              <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-full border border-zinc-100 bg-white px-3 py-1.5 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                {settings.available ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[0.65rem] font-semibold text-zinc-600 dark:text-zinc-300">
                      Open to work
                    </span>
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="text-[0.65rem] font-semibold text-zinc-600 dark:text-zinc-300">
                      Not available
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="
          absolute bottom-10 left-1/2 hidden
          -translate-x-1/2 flex-col items-center gap-1.5
          text-zinc-400 transition-colors hover:text-zinc-700
          dark:text-zinc-600 dark:hover:text-zinc-400 md:flex
        "
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}