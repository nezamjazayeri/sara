import { useState, useEffect, useRef, useCallback } from 'react'

interface ButtonPos {
  x: number
  y: number
  vx: number
  vy: number
}

function randomVelocity() {
  const speed = 0.5 + Math.random() * 1
  const angle = Math.random() * Math.PI * 2
  return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed }
}

export default function ValentineScreen({ onYes }: { onYes: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [noIsYes, setNoIsYes] = useState(false)
  const BUTTON_SIZE = 120
  const PROXIMITY_THRESHOLD = 150

  const [yesPos, setYesPos] = useState<ButtonPos>(() => ({
    x: window.innerWidth * 0.3,
    y: window.innerHeight * 0.5,
    ...randomVelocity(),
  }))

  const [noPos, setNoPos] = useState<ButtonPos>(() => ({
    x: window.innerWidth * 0.65,
    y: window.innerHeight * 0.5,
    ...randomVelocity(),
  }))

  const bounceButton = useCallback((pos: ButtonPos): ButtonPos => {
    const container = containerRef.current
    if (!container) return pos

    const rect = container.getBoundingClientRect()
    const maxX = rect.width - BUTTON_SIZE
    const maxY = rect.height - BUTTON_SIZE

    let { x, y, vx, vy } = pos
    x += vx
    y += vy

    if (x <= 0 || x >= maxX) {
      vx = -vx
      x = Math.max(0, Math.min(x, maxX))
    }
    if (y <= 0 || y >= maxY) {
      vy = -vy
      y = Math.max(0, Math.min(y, maxY))
    }

    return { x, y, vx, vy }
  }, [])

  useEffect(() => {
    let animId: number

    const animate = () => {
      setYesPos((prev) => bounceButton(prev))
      setNoPos((prev) => bounceButton(prev))
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [bounceButton])

  useEffect(() => {
    const noCenterX = noPos.x + BUTTON_SIZE / 2
    const noCenterY = noPos.y + BUTTON_SIZE / 2
    const dx = mousePos.x - noCenterX
    const dy = mousePos.y - noCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)
    setNoIsYes(distance < PROXIMITY_THRESHOLD)
  }, [mousePos, noPos])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  return (
    <div
      className="screen valentine-screen"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <h1 className="valentine-question">Will you be my Valentine?</h1>

      <button
        className={`floating-btn ${noIsYes ? 'no-btn' : 'yes-btn'}`}
        style={{
          left: yesPos.x,
          top: yesPos.y,
          width: BUTTON_SIZE,
          height: 50,
        }}
        onClick={onYes}
      >
        {noIsYes ? 'No' : 'Yes'}
      </button>

      <button
        className={`floating-btn ${noIsYes ? 'yes-btn' : 'no-btn'}`}
        style={{
          left: noPos.x,
          top: noPos.y,
          width: BUTTON_SIZE,
          height: 50,
        }}
        onClick={onYes}
      >
        {noIsYes ? 'Yes' : 'No'}
      </button>
    </div>
  )
}
