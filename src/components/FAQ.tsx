import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '../data/faq'

const EASE = [0.22, 1, 0.36, 1] as const

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  return (
    <section id="faq" className="faq section">
      <motion.div
        className="section-intro centered"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="eyebrow">FAQ</p>
        <h2>A few quick answers.</h2>
      </motion.div>

      <motion.div
        className="faq-list"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      >
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={item.question} className="faq-item">
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown size={16} strokeWidth={1.5} className={`faq-chevron ${isOpen ? 'is-open' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="faq-answer-wrap"
                    initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <p className="faq-answer">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}

export default FAQ
