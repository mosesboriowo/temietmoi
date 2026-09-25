import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, MessageCircle } from 'lucide-react'
import { cashGiftAccount, whatsappLink } from '../data/cashGift'

const EASE = [0.22, 1, 0.36, 1] as const

function CashGift() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(cashGiftAccount.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access can fail (permissions, older browsers) — fine to
      // just silently no-op; the number is still visible to copy by hand.
    }
  }

  return (
    <section id="gifts" className="gifts section">
      <motion.div
        className="section-intro centered"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="eyebrow">GIFTS</p>
        <h2>Celebrate our new beginning.</h2>
        <p>
          Your presence and love mean the most to us. If you'd like to bless us with a gift,
          whether a contribution or something more personal, we'd be grateful.
        </p>
      </motion.div>

      <motion.div
        className="cash-gift-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      >
        <div className="cash-gift-row">
          <span className="cash-gift-label">ACCOUNT NAME</span>
          <span className="cash-gift-value">{cashGiftAccount.accountName}</span>
        </div>
        <div className="cash-gift-row">
          <span className="cash-gift-label">BANK NAME</span>
          <span className="cash-gift-value">{cashGiftAccount.bankName}</span>
        </div>
        <div className="cash-gift-row">
          <span className="cash-gift-label">ACCOUNT NUMBER</span>
          <button type="button" className="cash-gift-copy" onClick={handleCopy}>
            <span className="cash-gift-value">{cashGiftAccount.accountNumber}</span>
            {copied ? (
              <span className="cash-gift-copy-hint">
                <Check size={13} strokeWidth={2} /> COPIED
              </span>
            ) : (
              <span className="cash-gift-copy-hint">
                <Copy size={13} strokeWidth={1.75} /> COPY ACCOUNT NUMBER
              </span>
            )}
          </button>
        </div>
      </motion.div>

      <motion.div
        className="cash-gift-cta-wrap"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      >
        <p className="cash-gift-physical-note">Prefer to send a physical gift instead?</p>
        <a className="cash-gift-cta" href={whatsappLink} target="_blank" rel="noreferrer">
          <MessageCircle size={16} strokeWidth={1.75} /> GIVE A PHYSICAL GIFT
        </a>
      </motion.div>
    </section>
  )
}

export default CashGift
