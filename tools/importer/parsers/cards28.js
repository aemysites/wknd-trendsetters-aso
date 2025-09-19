/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card element
  function extractCardContent(cardEl) {
    // Try to find an image inside the card
    const img = cardEl.querySelector('img');
    // Find the heading (h3)
    const heading = cardEl.querySelector('h3');
    // Find the description (div with class 'paragraph-sm')
    const desc = cardEl.querySelector('.paragraph-sm');
    // Compose the text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    return [img || '', textCell];
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [];

  tabPanes.forEach(tabPane => {
    // Each tab pane contains a grid-layout div
    const grid = tabPane.querySelector('.grid-layout');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach(card => {
      rows.push(extractCardContent(card));
    });
  });

  // Build the table: header row, then one row per card
  const headerRow = ['Cards (cards28)'];
  const tableRows = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
