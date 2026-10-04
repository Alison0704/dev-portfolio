import { useEffect, useRef, useState } from 'react'
import { cx } from '../cx'
import styles from './IdleBitRain.module.css'

const IDLE_DELAY_MS = 1_000
const VISIBLE_FOR_MS = 30_000
const FADE_OUT_MS = 600

const COLUMN_WIDTH = 15
const ROW_HEIGHT = 16
const FONT = '500 12px "JetBrains Mono", monospace'

// How often bits flip between 1 and 0: blue trail bits flicker fast, the pinkish-white head slowly
const TRAIL_FLIP_MS = 90
const HEAD_FLIP_MS = 650

type Point = { x: number; y: number }

type Column = {
  head: number // y of the leading bit, in px
  speed: number // px per second
  length: number // bits in the trail
  parity: number // whether this stream starts on 1 or 0
  phase: number // ms offset so columns don't flip in unison
}

const random = (min: number, max: number) => min + Math.random() * (max - min)

function makeColumn(height: number, scattered: boolean): Column {
  const length = Math.round(random(6, 16))
  return {
    head: scattered ? random(-height * 0.5, height) : random(-ROW_HEIGHT * length, 0),
    speed: random(45, 120),
    length,
    parity: Math.round(Math.random()),
    phase: random(0, 1000),
  }
}

// After the mouse rests for a while, a waterfall of alternating bits fades in beneath it
export default function IdleBitRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Stays mounted (hidden) so the first appearance still transitions in
  const [anchor, setAnchor] = useState<Point>({ x: -9999, y: -9999 })
  const [visible, setVisible] = useState(false)

  // Idle detection: show after the pointer rests, dismiss on activity or after a timeout
  useEffect(() => {
    let last: Point | null = null
    let idleTimer = 0
    let dismissTimer = 0

    const hide = () => {
      window.clearTimeout(dismissTimer)
      setVisible(false)
    }

    const armIdle = () => {
      window.clearTimeout(idleTimer)
      if (!last) return
      idleTimer = window.setTimeout(() => {
        if (last) setAnchor(last)
        setVisible(true)
        dismissTimer = window.setTimeout(hide, VISIBLE_FOR_MS)
      }, IDLE_DELAY_MS)
    }

    // Any interaction counts as activity: dismiss and restart the idle countdown
    const handleActivity = () => {
      hide()
      armIdle()
    }

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      last = { x: e.clientX, y: e.clientY }
      handleActivity()
    }

    const handleLeave = () => {
      last = null
      window.clearTimeout(idleTimer)
      hide()
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerdown', handleActivity)
    window.addEventListener('wheel', handleActivity, { passive: true })
    window.addEventListener('scroll', handleActivity, { passive: true })
    window.addEventListener('keydown', handleActivity)
    document.documentElement.addEventListener('pointerleave', handleLeave)
    return () => {
      window.clearTimeout(idleTimer)
      window.clearTimeout(dismissTimer)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', handleActivity)
      window.removeEventListener('wheel', handleActivity)
      window.removeEventListener('scroll', handleActivity)
      window.removeEventListener('keydown', handleActivity)
      document.documentElement.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  // Rain animation: only runs while shown (plus its fade-out)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!visible || !canvas || !ctx) return

    const { width, height } = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.scale(dpr, dpr)
    ctx.font = FONT
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const rootStyle = getComputedStyle(document.documentElement)
    const headColor = rootStyle.getPropertyValue('--accent').trim()
    const trailColor = rootStyle.getPropertyValue('--secondary').trim()

    const columns = Array.from({ length: Math.floor(width / COLUMN_WIDTH) }, () => makeColumn(height, true))
    const offsetX = (width - columns.length * COLUMN_WIDTH) / 2 + COLUMN_WIDTH / 2

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)
      columns.forEach((col, i) => {
        const x = offsetX + i * COLUMN_WIDTH
        for (let k = 0; k < col.length; k++) {
          const y = col.head - k * ROW_HEIGHT
          if (y < -ROW_HEIGHT || y > height + ROW_HEIGHT) continue
          // Bits alternate down each stream, travel with it, and flip over time;
          // each bit gets its own phase so neighbours don't flip together
          const flipMs = k === 0 ? HEAD_FLIP_MS : TRAIL_FLIP_MS
          const flips = Math.floor((now + col.phase + k * 37) / flipMs)
          const bit = (k + col.parity + flips) % 2 === 0 ? '1' : '0'
          ctx.globalAlpha = k === 0 ? 0.95 : 0.7 * (1 - k / col.length)
          ctx.fillStyle = k === 0 ? headColor : trailColor
          ctx.fillText(bit, x, y)
        }
      })
      ctx.globalAlpha = 1
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(0)
      return
    }

    let frame = 0
    let previous = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.1)
      previous = now
      columns.forEach((col, i) => {
        col.head += col.speed * dt
        if (col.head - col.length * ROW_HEIGHT > height) columns[i] = makeColumn(height, false)
      })
      draw(now)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    // Keep falling through the fade-out, then stop
    return () => {
      window.setTimeout(() => cancelAnimationFrame(frame), FADE_OUT_MS)
    }
  }, [visible])

  return (
    <div
      className={cx(styles.wrap, visible && styles.visible)}
      style={{ top: anchor.y, left: anchor.x }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
