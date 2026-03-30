/**
 * Contact — form with availability toggle + database-ready submission.
 * Messages are sent to /api/contact (POST) and stored via the backend.
 * Availability state is persisted to /api/availability (GET/POST).
 *
 * ── Backend integration ──────────────────────────────────────────────────
 * Replace the fetch calls below with your actual API endpoints.
 * The expected request/response shapes are documented inline.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mail, Send, GitBranch, Layers, ToggleLeft, ToggleRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

/* ── CONFIG — update these to match your real API ── */
const API_BASE = import.meta.env.VITE_API_BASE + "/api";



const socials = [
  {
    label: "GitHub",
    handle: "@Samin200",
    href: "https://github.com/Samin200",
    Icon: GitBranch,
    bg: "bg-zinc-100 dark:bg-zinc-800",
    color: "text-zinc-700 dark:text-zinc-300",
  },
  {
    label: "LinkedIn",
    handle: "in/samin-safwan-a3a2b63bb",
    href: "https://www.linkedin.com/in/samin-safwan-a3a2b63bb/",
    Icon: Layers,
    bg: "bg-blue-50 dark:bg-blue-950/40",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Email",
    handle: "saminsafwan2@gmail.com",
    href: "mailto:saminsafwan2@gmail.com",
    Icon: Mail,
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    color: "text-emerald-600 dark:text-emerald-400",
  },
];

const fieldBase = `
  mt-1.5 w-full rounded-xl
  border border-zinc-200 bg-zinc-50
  px-4 py-3 text-sm text-zinc-900
  placeholder:text-zinc-400 outline-none
  ring-offset-white transition-all duration-150
  focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200
  dark:border-zinc-700/70 dark:bg-zinc-800/60 dark:text-zinc-100
  dark:placeholder:text-zinc-500 dark:ring-offset-zinc-950
  dark:focus:border-zinc-500 dark:focus:bg-zinc-800 dark:focus:ring-zinc-700/60
`;

const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="block text-xs font-semibold tracking-wide text-zinc-600 dark:text-zinc-400"
  >
    {children}
  </label>
);

/* ── Availability Toggle component ── */
function AvailabilityToggle() {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/availability`)
      .then((r) => r.json())
      .then((d) => setAvailable(d.available ?? true))
      .catch(() => {});
  }, []);

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Availability Status
        </span>
      </div>
      <span
        className={`
          flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold
          ${available
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
            : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
          }
        `}
      >
        {available
          ? <><ToggleRight size={14} /> Available</>
          : <><ToggleLeft size={14} /> Unavailable</>
        }
      </span>
    </div>
  );
}

/* ── Main Contact section ── */
export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", budget: "", message: "",
  });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        /*
         * Expected body shape (matches your DB schema):
         * { name, email, budget, message }
         * The server should store these + a timestamp.
         */
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");
      setSent(true);
    } catch {
      /* Fallback: simulate success in dev so the UI is testable */
      if (import.meta.env.DEV) {
        console.info("[DEV] No backend connected — showing success state.");
        setSent(true);
      } else {
        setError("Something went wrong. Please email me directly.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="px-6 py-28 lg:px-8">
      <div className="mx-auto mb-20 w-full max-w-6xl">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-[1fr_1.15fr] md:items-start lg:gap-24">

        {/* Left */}
        <div className="flex flex-col gap-10">
          <SectionHeading
            label="Contact"
            title="Got a project? Let's talk."
            description="Tell me what you need and I'll get back to you as soon as I can — usually within a day or two."
          />

          {/* Availability toggle */}
          <AvailabilityToggle />

          {/* Social links */}
          <div>
            <p className="mb-5 text-[0.68rem] font-bold tracking-[0.22em] text-zinc-400 uppercase dark:text-zinc-500">
              Find me on
            </p>
            <ul className="flex flex-col gap-3">
              {socials.map(({ label, handle, href, Icon, bg, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? "_self" : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                    className="group flex items-center gap-3 rounded-xl border border-transparent p-1 transition-all duration-150 hover:border-zinc-100 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/60"
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} ${color} transition-transform duration-150 group-hover:scale-105`}>
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{label}</span>
                      <span className="text-[0.7rem] text-zinc-400 dark:text-zinc-500">{handle}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="
                  flex flex-col items-center gap-5 rounded-2xl
                  border border-emerald-100 bg-emerald-50
                  px-8 py-16 text-center
                  dark:border-emerald-900/40 dark:bg-emerald-950/20
                "
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <CheckCircle size={48} className="text-emerald-500" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Message received!
                  </p>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    I'll get back to you within a day or two.
                  </p>
                </div>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", budget: "", message: "" }); }}
                  className="mt-1 text-xs font-medium text-zinc-400 underline underline-offset-2 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="
                  space-y-5 rounded-2xl
                  border border-zinc-100 bg-zinc-50/50
                  p-6 shadow-sm
                  dark:border-zinc-800 dark:bg-zinc-900/50
                "
                noValidate
              >
                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <input
                      id="name" type="text" placeholder="Jane Smith"
                      required autoComplete="name"
                      value={form.name} onChange={handleChange}
                      className={fieldBase}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <input
                      id="email" type="email" placeholder="jane@company.com"
                      required autoComplete="email"
                      value={form.email} onChange={handleChange}
                      className={fieldBase}
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <Label htmlFor="budget">Budget range</Label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className={`${fieldBase} cursor-pointer appearance-none`}
                  >
                    <option value="" disabled>Select a range…</option>
                    {["< $500", "$500 – $1,500", "$1,500 – $3,000", "$3,000+"].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">Project details</Label>
                  <textarea
                    id="message" rows={5}
                    placeholder="Describe your project, goals, and expected timeline…"
                    required
                    value={form.message} onChange={handleChange}
                    className={`${fieldBase} resize-none`}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="rounded-lg bg-red-50 px-4 py-2 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group relative inline-flex items-center gap-2
                    overflow-hidden rounded-full
                    bg-zinc-950 px-8 py-3.5
                    text-sm font-semibold text-white shadow-sm
                    transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md
                    disabled:cursor-not-allowed disabled:opacity-60
                    dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white
                  "
                >
                  <span
                    className="absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-500 group-hover:translate-x-full"
                    aria-hidden
                  />
                  {loading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-zinc-950/30 dark:border-t-zinc-950" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
