/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (block name)
  const headerRow = ['Hero (hero20)'];

  // --- 1. Extract background images (collage) ---
  // Find the grid of images (background collage)
  let backgroundImagesContainer = null;
  const gridContainers = element.querySelectorAll('.grid-layout');
  for (const grid of gridContainers) {
    // Look for a grid with multiple image children
    const imgs = grid.querySelectorAll('img');
    if (imgs.length >= 3) {
      backgroundImagesContainer = grid;
      break;
    }
  }

  // Defensive: fallback if not found
  let backgroundImages = [];
  if (backgroundImagesContainer) {
    backgroundImages = Array.from(backgroundImagesContainer.querySelectorAll('img'));
  }

  // --- 2. Extract hero content (headline, subheading, CTA) ---
  // Find the content container
  let contentContainer = null;
  const contentCandidates = element.querySelectorAll('.ix-hero-scale-3x-to-1x-content, .container');
  for (const candidate of contentCandidates) {
    // Look for a container with h1 and possibly buttons
    if (candidate.querySelector('h1')) {
      contentContainer = candidate;
      break;
    }
  }

  // Defensive: fallback if not found
  let heroContent = [];
  if (contentContainer) {
    // Title (h1)
    const title = contentContainer.querySelector('h1');
    if (title) heroContent.push(title);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) heroContent.push(subheading);
    // CTA buttons (a)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Only include links (not the container)
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) heroContent.push(...ctas);
    }
  }

  // --- 3. Build table rows ---
  // Row 2: background images (collage)
  const backgroundRow = [backgroundImages];

  // Row 3: hero content (headline, subheading, CTA)
  const contentRow = [heroContent];

  // --- 4. Create the block table ---
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // --- 5. Replace original element ---
  element.replaceWith(block);
}
