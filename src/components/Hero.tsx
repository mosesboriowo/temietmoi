import { useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import SignatureName from './SignatureName'
import Monogram from './Monogram'

// Slow, cinematic reveal: each line arrives a beat after the last.
// No bounce, no spring overshoot — just a quiet fade + rise.
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.3 },
  },
}

const line = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function Hero() {
  const [imageFailed, setImageFailed] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Gentle parallax on the photograph as the page loads — never on scroll-jack,
  // just a slow drift so the portrait feels alive rather than static.
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : 90])

  return (
    <section id="hero" className="hero" aria-label="Temitope and Moses — our wedding day">
      <motion.div
        className="hero-image-layer"
        style={{ y: parallaxY }}
        initial={{ scale: prefersReducedMotion ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {!imageFailed ? (
          <img
            className="hero-image"
            src="/images/hero.jpg"
            alt="Temitope and Moses, pre-wedding"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="hero-image hero-image-placeholder"
            role="img"
            aria-label="Pre-wedding image placeholder"
          >
            <span className="placeholder-label">PRE-WEDDING</span>
            <span className="placeholder-hint">Replace /public/images/hero.jpg</span>
          </div>
        )}
      </motion.div>

      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="tm-mark" variants={line}>
          <Monogram className="tm-mark-svg" />
        </motion.div>

        <motion.div className="hero-rule" variants={line} aria-hidden="true" />

        <motion.div variants={line}>
          <SignatureName />
        </motion.div>

        <motion.p className="hero-date" variants={line}>
          29.10.2026
        </motion.p>

        <motion.p className="hero-kicker" variants={line}>
          OUR WEDDING DAY
        </motion.p>

        <motion.a
          className="scroll-cue"
          variants={line}
          href="#story"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('story')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          ENTER OUR STORY <ArrowDown size={14} strokeWidth={1.5} />
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero
