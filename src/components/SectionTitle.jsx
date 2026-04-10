export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-8 text-center lg:text-left">
      <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300/80">{subtitle}</p>
      <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
    </div>
  )
}
