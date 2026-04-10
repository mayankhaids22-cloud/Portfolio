import { motion } from 'framer-motion'

export default function Navbar({ items, activeSection, theme, toggleTheme }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-40 mx-auto mt-4 w-[min(95%,1100px)] rounded-2xl border border-white/15 bg-slate-950/55 px-4 py-3 backdrop-blur-xl"
    >
      <nav className="flex items-center justify-between gap-4">
        <a href="#hero" className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
          MK
        </a>
        <ul className="hidden items-center gap-2 md:flex">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  activeSection === item.id
                    ? 'bg-fuchsia-500/30 text-white shadow-[0_0_20px_rgba(232,121,249,0.5)]'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg border border-cyan-300/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-200 transition hover:bg-cyan-400/20"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </nav>
    </motion.header>
  )
}
