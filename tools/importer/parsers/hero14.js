/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure element is present
  if (!element) return;

  // Header row: always use block name
  const headerRow = ['Hero (hero14)'];

  // --- Extract background image (2nd row) ---
  // Find the image inside the parallax container
  let backgroundImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div'); // grid-layout > divs
  for (const div of gridDivs) {
    // Look for the div with class ix-parallax-scale-out-hero
    if (div.classList.contains('ix-parallax-scale-out-hero')) {
      backgroundImg = div.querySelector('img');
      break;
    }
  }
  // If not found, fallback to any img in the block
  if (!backgroundImg) {
    backgroundImg = element.querySelector('img');
  }
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // --- Extract text content (3rd row) ---
  // Find the container with the heading and optional CTA
  let textContent = null;
  for (const div of gridDivs) {
    if (div.classList.contains('container')) {
      textContent = div;
      break;
    }
  }
  // Defensive: fallback to any container
  if (!textContent) {
    textContent = element.querySelector('.container');
  }
  const textRow = [textContent ? textContent : ''];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
