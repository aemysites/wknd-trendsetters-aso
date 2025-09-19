/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all images from the hero background grid
  function getHeroImages() {
    // Find the grid with images
    const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
    if (!grid) return [];
    // Get all img elements inside the grid
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper: get the hero content (title, subheading, CTAs)
  function getHeroContent() {
    // Find the content container
    const content = element.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (!content) return null;
    return content;
  }

  // Table header row
  const headerRow = ['Hero (hero20)'];

  // Row 2: Background images (all images stacked in one cell)
  const images = getHeroImages();
  const imagesCell = images.length ? images : [''];

  // Row 3: Content (title, subheading, CTAs)
  const heroContent = getHeroContent();
  const contentCell = heroContent ? [heroContent] : [''];

  // Compose table rows
  const rows = [
    headerRow,
    [imagesCell],
    [contentCell],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
