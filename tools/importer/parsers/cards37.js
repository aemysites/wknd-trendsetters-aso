/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card anchor
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const imgWrapper = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;
    if (!img) return null; // Image is mandatory for this block

    // Compose text cell by collecting all non-image content (flexible)
    const textCell = document.createElement('div');
    // Collect all children except the image wrapper
    Array.from(cardEl.children).forEach(child => {
      if (!child.matches('.utility-aspect-2x3, .utility-aspect-1x1')) {
        textCell.appendChild(child.cloneNode(true));
      }
    });

    return [img.cloneNode(true), textCell];
  }

  // Find all card anchors (each card is an <a> with .utility-link-content-block)
  const cards = [];
  // Get all possible grid containers
  const grids = element.querySelectorAll('.grid-layout');
  grids.forEach(grid => {
    grid.querySelectorAll('a.utility-link-content-block').forEach(cardEl => {
      cards.push(cardEl);
    });
  });
  // Defensive: also check for direct children if not found
  if (cards.length === 0) {
    element.querySelectorAll('a.utility-link-content-block').forEach(cardEl => {
      cards.push(cardEl);
    });
  }

  // Build table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards37)'];
  rows.push(headerRow);
  // Card rows (only those with images, as required)
  cards.forEach(cardEl => {
    const card = extractCardInfo(cardEl);
    if (card) rows.push(card);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
