/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if element exists
  if (!element) return;

  // Table header row
  const headerRow = ['Hero (hero39)'];

  // --- Row 2: Background Image (optional) ---
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div.w-layout-grid > div');
  if (gridDivs.length > 0) {
    // Look for an <img> inside the first grid cell
    bgImg = gridDivs[0].querySelector('img');
  }
  // If not found, fallback to any img inside header
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // --- Row 3: Text Content ---
  // Find the text container (second grid cell)
  let textContainer = null;
  if (gridDivs.length > 1) {
    textContainer = gridDivs[1];
  }
  // Defensive: If not found, fallback to any container with heading
  if (!textContainer) {
    textContainer = element.querySelector('h1')?.parentElement;
  }

  // Extract heading, paragraph, and CTA
  let heading = null, paragraph = null, cta = null;
  if (textContainer) {
    heading = textContainer.querySelector('h1');
    paragraph = textContainer.querySelector('p');
    cta = textContainer.querySelector('a');
  }

  // Compose content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (paragraph) contentCell.push(paragraph);
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table rows
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
