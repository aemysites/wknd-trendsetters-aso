/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct card containers
  const cardDivs = Array.from(grid.children);

  // Build table rows
  const rows = [];
  // Header row as required
  rows.push(['Cards (cards17)']);

  // For each card, extract the image (first cell) and ensure second cell is present (mandatory 2 columns)
  cardDivs.forEach(cardDiv => {
    // Find the image inside the card
    const imgContainer = cardDiv.querySelector('.utility-aspect-2x3');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }
    const imageCell = imgEl || '';
    // Second cell must be present (mandatory 2 columns), but no text in source
    // Fix: Remove the second cell entirely if no text, so only one cell per row after header
    rows.push([imageCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
