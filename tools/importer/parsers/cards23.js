/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image, title, and description from a card anchor
  function extractCardContent(card) {
    // Get image (if present)
    let img = card.querySelector('img');
    // Get heading (h3)
    let heading = card.querySelector('h3');
    // Get all paragraphs (all .paragraph-sm inside the card)
    let descs = Array.from(card.querySelectorAll('.paragraph-sm'));
    // Compose text cell: heading (if any), then ALL descriptions (if any)
    const textContent = [];
    if (heading) textContent.push(heading);
    descs.forEach(desc => textContent.push(desc));
    // Only add row if image exists, per block spec (no empty image cells)
    if (img) {
      return [img, textContent];
    }
    // If no image, skip this card (do not add empty cell)
    return null;
  }

  // Find the first active tab pane (should be the visible one)
  const activePane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activePane) return;

  // Find the grid inside the active tab
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all card links (anchor tags)
  const cards = Array.from(grid.querySelectorAll('a'));
  if (!cards.length) return;

  // Build table rows
  const rows = [];
  // Header row as specified
  const headerRow = ['Cards (cards23)'];
  rows.push(headerRow);

  // For each card, extract [image, text] columns, skip if no image
  cards.forEach(card => {
    const row = extractCardContent(card);
    if (row) rows.push(row);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
