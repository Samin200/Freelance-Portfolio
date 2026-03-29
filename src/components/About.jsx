/**
 * About — biography, course background, and process steps.
 */
import { motion } from "framer-motion";
import { Code2, Wind, Clock, Bot } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const highlights = [
  { value: "React",       label: "Primary framework",  icon: Code2 },
  { value: "Tailwind",    label: "Styling of choice",  icon: Wind  },
  { value: "6 Months",    label: "Programming Hero",   icon: Clock },
  { value: "AI-assisted", label: "Workflow & tooling", icon: Bot   },
];

const processSteps = ["Understand", "Plan", "Design", "Build", "Deliver"];

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 },
  }),
};

export function About() {
  return (
    <section id="about" className="px-6 py-28 lg:px-8">
      <div className="mx-auto mb-20 w-full max-w-6xl">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-[1fr_1fr] md:items-start lg:gap-24">

        {/* Left column */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            label="About"
            title="Learning by building real things"
            description="I completed a 6-month structured web development course at Programming Hero, where I went from the basics to building full React applications. Now I take on freelance projects to keep growing."
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-md text-base leading-relaxed text-zinc-500 dark:text-zinc-400"
          >
            I build with React and Tailwind CSS, and I use AI tools as part of my
            development workflow — for writing, debugging, and learning faster.
            I'm honest about where I am in my journey and focused on delivering
            clean, working websites for every client.
          </motion.p>

          {/* Process timeline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-2"
          >
            {processSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="
                  inline-flex items-center gap-2 rounded-full
                  border border-zinc-200/80 bg-white
                  px-4 py-1.5 text-xs font-medium text-zinc-600
                  shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300
                ">
                  <span className="text-[0.6rem] font-bold text-zinc-300 dark:text-zinc-600">
                    0{i + 1}
                  </span>
                  {step}
                </span>
                {i < processSteps.length - 1 && (
                  <span className="h-px w-3 bg-zinc-200 dark:bg-zinc-700" aria-hidden />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column: cards */}
        <div className="grid grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="
                group relative flex flex-col justify-between
                overflow-hidden rounded-2xl
                border border-zinc-100 bg-zinc-50 p-6
                transition-all duration-300
                hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-md hover:shadow-zinc-100
                dark:border-zinc-800 dark:bg-zinc-900
                dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/60
              "
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-400/0 blur-2xl transition-all duration-500 group-hover:bg-blue-400/10 dark:group-hover:bg-blue-500/10"
                aria-hidden
              />
              <item.icon
                size={16}
                className="mb-3 text-zinc-400 dark:text-zinc-500"
              />
              <div>
                <span className="block text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {item.value}
                </span>
                <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}