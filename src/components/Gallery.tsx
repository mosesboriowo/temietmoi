import { useEffect, useState } from 'react'
import { motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '../data/gallery'

const EASE = [0.22, 1, 0.36, 1] as const

function Gallery() {
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()
  const count = galleryImages.length

  function go(delta: number) {
    setActive((a) => (a + delta + count) % count)
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    const threshold = 60
    if (info.offset.x < -threshold) go(1)
    else if (info.offset.x > threshold) go(-1)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return (
    <section id="gallery" className="gallery section">
      <div className="section-intro centered">
        <p className="eyebrow">MOMENTS SO FAR</p>
        <h2>Gallery</h2>
      </div>

      <motion.div
        className="gallery-track"
        drag="x"
        dragElastic={0.12}
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        tabIndex={0}
        role="group"
        aria-label="Photo gallery — use arrow keys or drag to browse"
      >
        {galleryImages.map((img, i) => {
          let offset = i - active
          if (offset > count / 2) offset -= count
          if (offset < -count / 2) offset += count
          if (Math.abs(offset) > 2) return null

          const scale = offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.76 : 0.6
          const xPct = offset * 62
          const opacity = Math.abs(offset) > 1 ? 0.4 : 1
          const zIndex = 10 - Math.abs(offset)

          return (
            <motion.button
              key={img.src}
              type="button"
              className="gallery-item"
              style={{ zIndex }}
              animate={reducedMotion ? undefined : { x: `${xPct}%`, scale, opacity }}
              transition={{ duration: 0.7, ease: EASE }}
              onClick={() => offset !== 0 && setActive(i)}
              aria-label={offset === 0 ? img.alt : `Go to ${img.alt}`}
              aria-current={offset === 0}
            >
              <img src={img.src} alt={img.alt} draggable={false} />
            </motion.button>
          )
        })}
      </motion.div>

      {galleryImages[active]?.caption && (
        <motion.p
          key={active}
          className="gallery-caption"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {galleryImages[active].caption}
        </motion.p>
      )}

      <div className="gallery-controls">
        <button type="button" className="gallery-btn" onClick={() => go(-1)} aria-label="Previous photo">
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <div className="gallery-dots">
          {galleryImages.map((_, i) => (
            <span key={i} className={`gallery-dot ${i === active ? 'is-active' : ''}`} />
          ))}
        </div>
        <button type="button" className="gallery-btn" onClick={() => go(1)} aria-label="Next photo">
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  )
}

export default Gallery
