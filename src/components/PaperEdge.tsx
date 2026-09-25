/**
 * A soft, irregular edge — like the deckled edge of a piece of stationery,
 * not a cartoon zigzag. Its fill color is the section on the OTHER side of
 * the edge, so it reads as "this chapter tears open to reveal the next,"
 * using colors already present on the page. Used sparingly at specific
 * chapter transitions, not between every section.
 */
function PaperEdge({ fill, position = 'bottom' }: { fill: string; position?: 'top' | 'bottom' }) {
  return (
    <div className={`paper-edge paper-edge-${position}`} aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path
          d="M0,16 Q30,4 60,16 Q90,26 120,14 Q150,6 180,18 Q210,28 240,12 Q270,4 300,17 Q330,25 360,13 Q390,6 420,19 Q450,27 480,15 Q510,5 540,18 Q570,24 600,12 Q630,6 660,19 Q690,26 720,14 Q750,5 780,17 Q810,25 840,13 Q870,6 900,18 Q930,26 960,15 Q990,5 1020,17 Q1050,24 1080,13 Q1110,6 1140,18 Q1170,25 1200,16 L1200,40 L0,40 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

export default PaperEdge
