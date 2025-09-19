/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate child divs
  const topDivs = element.querySelectorAll(':scope > div');

  // Header row for the block
  const headerRow = ['Carousel (carousel21)'];

  // Slides rows
  const rows = [];

  // Defensive: Find the card container
  let cardBody;
  let imgEl;
  let headingEl;

  // Find the card-body div (contains heading and image)
  for (const div of topDivs) {
    // Look for nested card-body
    cardBody = div.querySelector('.card-body');
    if (cardBody) break;
  }

  if (cardBody) {
    // Find the image element
    imgEl = cardBody.querySelector('img');
    // Find the heading element (optional)
    headingEl = cardBody.querySelector('.h4-heading');
  }

  // First cell: image only
  let imageCell = imgEl ? imgEl : '';

  // Second cell: text content (heading if present)
  let textCell = '';
  if (headingEl) {
    // Create a heading element (use <h3> for semantic heading)
    const h3 = document.createElement('h3');
    h3.textContent = headingEl.textContent;
    textCell = h3;
  }

  // Only add slide row if image is present
  if (imageCell) {
    rows.push([imageCell, textCell]);
  }

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
