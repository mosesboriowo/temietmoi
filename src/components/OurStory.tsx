import { useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { personStories, type PersonStory } from '../data/story'
import { firstMessageScreenshot } from '../data/media'

const EASE = [0.22, 1, 0.36, 1] as const

function useReveal() {
  const reduced = useReducedMotion()
  const image: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, scale: 1.05 },
    visible: reduced
      ? { opacity: 1 }
      : { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
  }
  const copy: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: reduced
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.15 } },
  }
  return { image, copy }
}

/** One person's story — photo, label, name, preview and Read More all
 * stacked and centered, rather than floated beside the text. Name is
 * rendered large and in capitals; Read More is an outlined pill button
 * matching the site's other outlined buttons. */
function PersonStorySection({ person }: { person: PersonStory }) {
  const { image, copy } = useReveal()
  const [expanded, setExpanded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      className="person-story-centered"
      variants={copy}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.img
        className="person-story-portrait-c"
        variants={image}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        src={imageFailed ? undefined : person.image}
        alt={person.name}
        onError={() => setImageFailed(true)}
        style={imageFailed ? { background: 'linear-gradient(150deg, #EFE4E7 0%, #E7D9DE 55%, #C9AFC0 100%)' } : undefined}
      />

      <span className="person-story-label">{person.label}</span>
      <h3 className="person-story-name">{person.name}</h3>

      {!expanded ? (
        <p className="person-story-preview">{person.preview}</p>
      ) : (
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="person-story-full"
        >
          {person.fullText.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>
      )}

      <button
        type="button"
        className="person-story-read-more-outline"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? 'SHOW LESS' : 'READ MORE'}
      </button>
    </motion.article>
  )
}

/** The real first-conversation screenshot — presented as a small preserved
 * keepsake between the two personal stories and Moments So Far, not as
 * another "chapter." Uses a contain treatment so the actual screenshot
 * (with real text) is never cropped. A playful spring/bounce entrance
 * marks it as a little keepsake rather than another flat photo. */
function FirstConversation() {
  const { copy } = useReveal()
  const [imageFailed, setImageFailed] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <div className="first-conversation">
      <motion.div
        className="section-intro centered"
        variants={copy}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="eyebrow">THE FIRST CONVERSATION</p>
        <h2>Where it all began.</h2>
        <p>One conversation changed everything.</p>
      </motion.div>

      <motion.div
        className="story-screenshot-frame first-conversation-frame"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.75, rotate: -4 }}
        whileInView={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 1, scale: 1, rotate: 0 }
        }
        viewport={{ once: true, amount: 0.4 }}
        transition={reducedMotion ? undefined : { type: 'spring', stiffness: 260, damping: 14, mass: 0.9 }}
      >
        {!imageFailed ? (
          <img src={firstMessageScreenshot} alt="Our first messages" onError={() => setImageFailed(true)} />
        ) : (
          <div className="story-photo-placeholder">
            <span className="story-placeholder-hint">Add photo — {firstMessageScreenshot.split('/').pop()}</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function OurStory() {
  return (
    <section id="story" className="story section">
      <FirstConversation />

      <div className="section-intro centered">
        <p className="eyebrow">OUR STORY</p>
        <h2>Two perspectives. One story.</h2>
      </div>

      <div className="person-story-list">
        {personStories.map((person) => (
          <PersonStorySection key={person.id} person={person} />
        ))}
      </div>
    </section>
  )
}

export default OurStory
