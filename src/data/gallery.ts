export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

// Add more entries here as new photographs come in — reception, holy
// matrimony, and so on. Order controls carousel order. Captions are
// optional. Kept to three categories for now: pre-wedding, the journey,
// and the proposal.
export const galleryImages: GalleryImage[] = [
  { src: '/images/hero.jpg', alt: 'Temitope and Moses', caption: 'PRE-WEDDING' },
  { src: '/images/story-now.jpg', alt: 'Temitope and Moses', caption: 'PRE-WEDDING' },
  { src: '/images/prewedding-02.jpg', alt: 'Temitope and Moses', caption: 'PRE-WEDDING' },
  { src: '/images/prewedding-03.jpg', alt: 'Temitope and Moses', caption: 'PRE-WEDDING' },
  { src: '/images/story-journey-02.jpg', alt: 'Temitope and Moses', caption: 'THE JOURNEY' },
  { src: '/images/story-journey-01.jpg', alt: 'Temitope and Moses', caption: 'THE JOURNEY' },
  { src: '/images/gallery-proposal.jpg', alt: 'Temitope and Moses', caption: 'THE PROPOSAL' },
]
