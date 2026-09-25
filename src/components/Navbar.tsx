import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Monogram from './Monogram'

const LINKS = [
  { label: 'OUR STORY', href: '#story' },
  { label: 'MOMENTS SO FAR', href: '#gallery' },
  { label: 'GIFTS', href: '#gifts' },
  { label: 'WEDDING DETAILS', href: '#wedding-day' },
  { label: 'VENUE', href: '#venue' },
  { label: 'FAQ', href: '#faq' },
]

// Scrolls by element id rather than relying on native hash-anchor
// navigation, which some embedded/sandboxed preview contexts intercept or
// ignore. This guarantees every nav link actually moves the page.
function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const heroHeight = window.innerHeight
    const onScroll = () => setScrolled(window.scrollY > heroHeight * 0.82)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    scrollToId(href.replace('#', ''))
    setMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        <a
          className="navbar-mark"
          href="#hero"
          aria-label="Temitope and Moses — home"
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          <Monogram className="navbar-mark-svg" />
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="navbar-mobile-menu"
            aria-label="Mobile"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
