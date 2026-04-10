import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa'
import Background3D from './components/Background3D'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import SectionTitle from './components/SectionTitle'
import { navItems, projects, skills, timeline } from './data/portfolioData'

void motion

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const categories = ['All', ...new Set(projects.map((project) => project.category))]

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [activeSection, setActiveSection] = useState('hero')
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.2 },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const filteredProjects = useMemo(
    () => projects.filter((project) => activeCategory === 'All' || project.category === activeCategory),
    [activeCategory],
  )

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 text-cyan-200">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyan-400/30 border-t-cyan-300" />
          <div className="absolute inset-3 animate-pulse rounded-full bg-fuchsia-500/40 blur-md" />
        </div>
      </div>
    )
  }

  return (
    <>
      <CustomCursor />
      <Background3D />
      <div className="gradient-orb gradient-orb-a" />
      <div className="gradient-orb gradient-orb-b" />
      <Navbar items={navItems} activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto w-[min(94%,1100px)] space-y-28 pb-24 pt-28 md:space-y-36">
        {/* Hero section */}
        <section id="hero" className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Frontend Developer</p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              Crafting immersive digital worlds in neon motion.
            </h1>
            <p className="mb-8 max-w-xl text-slate-300 md:text-lg">
              I build performance-focused, highly interactive web experiences with modern React,
              motion design, and 3D storytelling.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/resume.pdf" className="btn-neon" download>
                Download Resume
              </a>
              <a href="#contact" className="btn-glass">
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <img
              src="https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=800&q=80"
              alt="Portrait"
              className="h-[420px] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </motion.div>
        </section>

        {/* About section */}
        <section id="about" className="space-y-10">
          <SectionTitle title="About Me" subtitle="Who I Am" />
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <p className="leading-relaxed text-slate-200">
                I’m a creative developer blending engineering and design to ship meaningful digital
                products. My focus is on performance, accessibility, and memorable interfaces.
              </p>
            </motion.article>
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="mb-4 text-lg font-medium text-white">Skills Matrix</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between text-sm text-cyan-200">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

        {/* Projects section */}
        <section id="projects" className="space-y-8">
          <SectionTitle title="Projects" subtitle="Selected Work" />
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeCategory === category
                    ? 'border-cyan-300 bg-cyan-400/20 text-cyan-100'
                    : 'border-white/20 text-slate-300 hover:border-cyan-300/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.title}
                className="glass-card overflow-hidden"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mb-4 text-slate-300">{project.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-fuchsia-300/40 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm">
                    <a href={project.demo} target="_blank" rel="noreferrer" className="link-neon">
                      Live Demo
                    </a>
                    <a href={project.code} target="_blank" rel="noreferrer" className="link-neon">
                      Source
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Experience section */}
        <section id="timeline" className="space-y-8">
          <SectionTitle title="Experience" subtitle="Timeline" />
          <div className="relative ml-3 border-l border-cyan-300/30 pl-6">
            {timeline.map((item, idx) => (
              <motion.article
                key={item.period}
                className="glass-card mb-6 p-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <span className="mb-1 block text-xs uppercase tracking-widest text-cyan-300">
                  {item.period}
                </span>
                <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                <p className="mb-2 text-fuchsia-200">{item.company}</p>
                <p className="text-slate-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="space-y-8">
          <SectionTitle title="Let’s Build Something" subtitle="Contact" />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <motion.form
              action="https://formspree.io/f/your-form-id"
              method="POST"
              className="glass-card space-y-4 p-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <label className="block">
                <span className="mb-2 block text-sm text-cyan-200">Name</span>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/20 bg-white/5 p-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-cyan-200">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-white/20 bg-white/5 p-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-cyan-200">Message</span>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full rounded-xl border border-white/20 bg-white/5 p-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>
              <button type="submit" className="btn-neon inline-flex items-center gap-2">
                <FaPaperPlane /> Send Message
              </button>
            </motion.form>

            <motion.aside
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card space-y-4 p-6"
            >
              <p className="text-slate-300">
                Reach out for collaborations, freelance opportunities, or full-time roles.
              </p>
              <div className="flex gap-4 text-xl text-cyan-200">
                <a href="mailto:hello@example.com" className="icon-link" aria-label="Email">
                  <FaEnvelope />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="icon-link" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              </div>
            </motion.aside>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
