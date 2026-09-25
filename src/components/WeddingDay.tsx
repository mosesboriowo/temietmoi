import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Monogram from './Monogram'
import PaperEdge from './PaperEdge'

const EASE = [0.22, 1, 0.36, 1] as const
const WEDDING_DATE = new Date('2026-10-29T08:00:00')

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

function useCountdown(target: Date) {
  const [remaining, setRemaining] = useState(() => target.getTime() - Date.now())

  useEffect(() => {
    const id = setInterval(() => setRemaining(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])

  const clamped = Math.max(remaining, 0)
  return {
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor((clamped % 86_400_000) / 3_600_000),
    minutes: Math.floor((clamped % 3_600_000) / 60_000),
    seconds: Math.floor((clamped % 60_000) / 1_000),
  }
}

function Countdown() {
  const target = useMemo(() => WEDDING_DATE, [])
  const { days, hours, minutes, seconds } = useCountdown(target)
  const units = [
    { label: 'DAYS', value: days },
    { label: 'HRS', value: hours },
    { label: 'MIN', value: minutes },
    { label: 'SEC', value: seconds },
  ]

  return (
    <div className="countdown" role="timer" aria-label="Countdown to the wedding day">
      {units.map((unit, i) => (
        <div className="countdown-unit" key={unit.label}>
          {i > 0 && <span className="countdown-sep" aria-hidden="true">:</span>}
          <div>
            <span className="countdown-value">{String(unit.value).padStart(2, '0')}</span>
            <span className="countdown-label">{unit.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function CeremonyJourney() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="ceremony-journey">
      <motion.div
        className="ceremony-block traditional"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <span className="ceremony-numeral" aria-hidden="true">
          08
        </span>
        <div className="ceremony-info">
          <span className="ceremony-time">08:00 AM</span>
          <h3>Traditional Wedding</h3>
          <p>Traditional Ceremony &amp; Engagement</p>
        </div>
      </motion.div>

      <motion.div
        className="ceremony-connector"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <span className="ceremony-connector-line" aria-hidden="true" />
        <div className="ceremony-photo-accent">
          {!imageFailed ? (
            <img
              src="/images/ceremony-photo.jpg"
              alt="Temitope and Moses"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="ceremony-photo-hint">Add photo</span>
          )}
        </div>
        <span className="ceremony-connector-line" aria-hidden="true" />
      </motion.div>

      <motion.div
        className="ceremony-block holy featured"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <span className="ceremony-numeral" aria-hidden="true">
          12
        </span>
        <div className="ceremony-info">
          <span className="ceremony-time">12:00 PM</span>
          <h3>Holy Matrimony</h3>
          <p>White Wedding / Church Ceremony</p>
        </div>
      </motion.div>
    </div>
  )
}

function InvitationCard() {
  const [open, setOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <div className="invitation-wrap">
      <button
        type="button"
        className={`invitation-card ${open ? 'is-open' : ''} ${reducedMotion ? 'no-flip' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close the digital invitation' : 'Open the digital invitation'}
      >
        <div className="invitation-face invitation-front">
          <Monogram className="tm-mark-svg" />
          <p className="invitation-eyebrow">OUR INVITATION</p>
          <span className="invitation-tap">TAP TO OPEN</span>
        </div>

        <div className="invitation-face invitation-back invitation-back-image">
          <img src="/images/invitation-card.jpg" alt="Temitope and Moses wedding invitation" />
        </div>
      </button>
    </div>
  )
}

function DressCode() {
  return (
    <div className="dress-code">
      <span className="dress-code-label">DRESS CODE</span>
      <div className="dress-code-swatches" aria-hidden="true">
        <span className="swatch" style={{ background: 'var(--purple)' }} />
        <span className="swatch" style={{ background: 'var(--mauve)' }} />
        <span className="swatch" style={{ background: 'var(--blush)' }} />
        <span className="swatch" style={{ background: 'var(--grey)' }} />
      </div>
      <p className="dress-code-note">
        Aso-ebi &amp; formal attire — shades of purple, mauve and neutral tones welcome.
      </p>
    </div>
  )
}

function WeddingDay() {
  return (
    <section id="wedding-day" className="wedding-day section dark-section">
      <motion.div
        className="section-intro centered"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="eyebrow">THE WEDDING DAY</p>
        <h2>
          One day.
          <br />
          Two celebrations.
        </h2>
        <p className="wedding-date-display">THURSDAY, 29TH OCTOBER 2026</p>
      </motion.div>

      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
        <Countdown />
      </motion.div>

      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <CeremonyJourney />
      </motion.div>

      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <InvitationCard />
      </motion.div>

      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
        <DressCode />
      </motion.div>

      <PaperEdge fill="var(--ivory)" />
    </section>
  )
}

export default WeddingDay
