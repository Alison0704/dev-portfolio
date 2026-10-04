import { useEffect, useRef, useState } from 'react'
import { cx } from '../cx'
import styles from './CursorGlow.module.css'

// A soft colour-dodge light that trails the mouse pointer
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame = 0

    // Ease towards the pointer so the glow trails slightly behind it
    const tick = () => {
      current.x += (target.x - current.x) * 0.18
      current.y += (target.y - current.y) * 0.18
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frame =
        Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1
          ? requestAnimationFrame(tick)
          : 0
    }

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      target.x = e.clientX
      target.y = e.clientY
      setVisible(true)
      if (reduceMotion) {
        current.x = target.x
        current.y = target.y
        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      } else if (!frame) {
        frame = requestAnimationFrame(tick)
      }
    }
    const handleLeave = () => setVisible(false)

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', handleLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handleMove)
      document.documentElement.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return <div ref={ref} className={cx(styles.glow, visible && styles.visible)} aria-hidden="true" />
}
