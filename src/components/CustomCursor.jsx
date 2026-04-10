import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'


export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const move = (event) => setPosition({ x: event.clientX, y: event.clientY })
    const enter = () => setActive(true)
    const leave = () => setActive(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseenter', enter)
    window.addEventListener('mouseleave', leave)

    const interactiveElements = document.querySelectorAll('a, button, input, textarea')
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', () => setActive(true))
      element.addEventListener('mouseleave', () => setActive(false))
    })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseenter', enter)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <Motion.div
      aria-hidden="true"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: active ? 1.4 : 1,
        opacity: 1,
      }}
      transition={{ type: 'spring', stiffness: 450, damping: 30, mass: 0.3 }}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-6 w-6 rounded-full border border-cyan-300/80 bg-cyan-300/20 shadow-[0_0_25px_rgba(34,211,238,0.8)] md:block"
    />
  )
}
