/**
 * Skills — categorised cards. Only skills Samin actually uses.
 */
import { motion } from "framer-motion";
import { Code2, Database, LayoutTemplate, Rocket } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const skillGroups = [
  {
    title:  "Frontend",
    icon:   LayoutTemplate,
    color:  "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
    glow:   "group-hover:bg-blue-400/[8%] dark:group-hover:bg-blue-500/10",
    border: "group-hover:border-blue-100 dark:group-hover:border-blue-900/60",
    skills: ["React", "JavaScript", "Tailwind CSS", "HTML & CSS", "Next.js", "Framer Motion"],
  },
  {
    title:  "Backend",
    icon:   Database,
    color:  "text-violet-500 dark:text-violet-400",
    iconBg: "bg-violet-50 dark:bg-violet-950/50",
    glow:   "group-hover:bg-violet-400/[8%] dark:group-hover:bg-violet-500/10",
    border: "group-hover:border-violet-100 dark:group-hover:border-violet-900/60",
    skills: ["Node.js", "Express.js", "REST APIs", "MongoDB"],
  },
  {
    title:  "Tools & Workflow",
    icon:   Code2,
    color:  "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
    glow:   "group-hover:bg-emerald-400/[8%] dark:group-hover:bg-emerald-500/10",
    border: "group-hover:border-emerald-100 dark:group-hover:border-emerald-900/60",
    skills: ["Git & GitHub", "VS Code", "Figma", "Vite", "Vercel", "AI-assisted workflow"],
  },
  {
    title:  "Currently Learning",
    icon:   Rocket,
    color:  "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-950/50",
    glow:   "group-hover:bg-amber-400/[8%] dark:group-hover:bg-amber-500/10",
    border: "group-hover:border-amber-100 dark:group-hover:border-amber-900/60",
    skills: ["TypeScript", "Accessibility", "Testing", "Performance"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="px-6 py-28 lg:px-8">
      <div className="mx-auto mb-20 w-full max-w-6xl">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
        <SectionHeading
          label="Skills"
          title="What I work with"
          description="A focused stack I use regularly. I'd rather know a few things well than claim to know everything."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className={`
                  group relative overflow-hidden rounded-2xl
                  border border-zinc-100 bg-white p-6
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-100/80
                  dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-zinc-950
                  ${group.border}
                `}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${group.iconBg}`}>
                    <Icon size={18} className={group.color} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {group.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="
                        rounded-full border border-zinc-100 bg-zinc-50
                        px-3 py-1 text-xs font-medium text-zinc-600
                        transition-colors duration-150
                        hover:border-zinc-300 hover:text-zinc-900
                        dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:text-zinc-300
                        dark:hover:border-zinc-500 dark:hover:text-zinc-100
                      "
                    >
                      {skill}
                    </li>
                  ))}
                </ul>

                <div
                  className={`
                    pointer-events-none absolute -right-10 -top-10
                    h-32 w-32 rounded-full bg-transparent blur-3xl
                    transition-all duration-500 ${group.glow}
                  `}
                  aria-hidden
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
