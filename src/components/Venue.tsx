import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

// The directions link builds a Google Maps search query from ADDRESS, so it
// stays a working link automatically if the address is ever refined further.
const VENUE_NAME = "St. James' Cathedral"
const ADDRESS = 'The Great, Oke-Bola, Ibadan'
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.753047691853!2d3.878197775914904!3d7.381549092628019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d79df148d29%3A0x86d31bd9bcacebae!2sThe%20Cathedral%20of%20St.%20James%20the%20Great!5e0!3m2!1sen!2sng!4v1786745501364!5m2!1sen!2sng'

function Venue() {
  return (
    <section id="venue" className="venue section">
      <motion.div
        className="venue-copy"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="eyebrow">FIND US</p>
        <h2>
          Same venue.
          <br />
          Same day.
        </h2>
        <p className="venue-name">{VENUE_NAME}</p>
        <div className="venue-meta">
          <MapPin size={18} strokeWidth={1.5} />
          <span>{ADDRESS}</span>
        </div>
        <a
          className="text-link venue-directions"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
          target="_blank"
          rel="noreferrer"
        >
          <Navigation size={14} strokeWidth={1.5} />
          GET DIRECTIONS
        </a>
      </motion.div>

      <motion.div
        className="map-frame"
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <iframe
          src={MAP_EMBED_SRC}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title={`${VENUE_NAME} location`}
        />
      </motion.div>
    </section>
  )
}

export default Venue
