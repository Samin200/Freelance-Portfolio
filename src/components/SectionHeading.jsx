/**
 * SectionHeading — animated eyebrow + title + description.
 * Used consistently in every section for visual rhythm.
 */
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0,  transition: { duration: 0.55, ease: "easeOut" } },
};

/**
 * @param {{ label: string, title: string, description: string, center?: boolean }} props
 */
export function SectionHeading({ label, title, description, center = false }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className={`max-w-2xl space-y-4 ${center ? "mx-auto text-center" : ""}`}
    >
      {/* ── Eyebrow label ── */}
      <motion.p
        variants={itemVariants}
        className="inline-flex items-center gap-2.5 text-[0.68rem] font-bold tracking-[0.25em] text-zinc-400 uppercase dark:text-zinc-500"
      >
        <span className="inline-block h-px w-6 bg-gradient-to-r from-zinc-400 to-transparent dark:from-zinc-500" />
        {label}
      </motion.p>

      {/* ── Main heading ── */}
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-semibold leading-[1.2] tracking-tight text-zinc-950 dark:text-zinc-50 md:text-4xl lg:text-[2.6rem]"
      >
        {title}
      </motion.h2>

      {/* ── Description ── */}
      <motion.p
        variants={itemVariants}
        className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
