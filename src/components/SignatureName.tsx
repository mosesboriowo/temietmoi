/**
 * The couple's name treatment — the one recurring brand device on the site.
 * Non-negotiable per design system: Alex Brush ONLY on the T and M initials,
 * Montserrat for every other letter, Montserrat for the ampersand.
 * Do not substitute a different script/serif pairing here.
 */
function SignatureName() {
  return (
    <span className="signature-name" aria-label="Temitope and Moses">
      <span className="script-letter">T</span>
      <span>emitope</span>
      <span className="ampersand">&amp;</span>
      <span className="script-letter">M</span>
      <span>oses</span>
    </span>
  )
}

export default SignatureName
