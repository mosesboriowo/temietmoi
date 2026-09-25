import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SignatureName from './SignatureName'
import Monogram from './Monogram'

const EASE = [0.22, 1, 0.36, 1] as const

// A distinct closing photograph, different from the hero image, so the
// footer doesn't just repeat the opening. Swap this path for a different
// photo whenever a new one is chosen.
const FOOTER_IMAGE = '/images/story-now.jpg'

function Footer() {
  const [imageFailed, setImageFailed] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <footer id="footer" className="footer">
      {!imageFailed ? (
        <img
          className="footer-bg"
          src={FOOTER_IMAGE}
          alt="Temitope and Moses"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="footer-bg footer-bg-placeholder" role="img" aria-label="Closing photograph placeholder" />
      )}

      <div className="footer-overlay" />

      <motion.div
        className="footer-content"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <p className="footer-kicker eyebrow">UNTIL WE SAY "I DO"</p>
        <div className="tm-mark">
          <Monogram className="tm-mark-svg" />
        </div>
        <SignatureName />
        <p className="footer-date">29.10.2026</p>
        <p className="footer-closing-line">Thank you for being part of our story.</p>
      </motion.div>
    </footer>
  )
}

export default Footer
