/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid layout
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Get all direct children that are <a> (each card)
    const cardEls = grid.querySelectorAll(':scope > a');
    cardEls.forEach(cardEl => {
      let imgEl = cardEl.querySelector('img');
      // Only include cards with an image (image/icon is mandatory)
      if (!imgEl) return;
      // Collect all heading and paragraph elements in the card
      const textCell = document.createElement('div');
      // Title
      const titleEl = cardEl.querySelector('h3, .h4-heading');
      if (titleEl) {
        textCell.appendChild(titleEl.cloneNode(true));
      }
      // All paragraph-sm elements (sometimes more than one)
      cardEl.querySelectorAll('.paragraph-sm').forEach(descEl => {
        textCell.appendChild(descEl.cloneNode(true));
      });
      // If no title or description, fallback to all text content
      if (!textCell.hasChildNodes()) {
        textCell.textContent = cardEl.textContent.trim();
      }
      cards.push([
        imgEl.cloneNode(true),
        textCell
      ]);
    });
    return cards;
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const allRows = [];
  // Header row
  allRows.push(['Cards (cards28)']);
  tabPanes.forEach(tabPane => {
    // Find the grid layout inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cardRows = extractCardsFromGrid(grid);
      cardRows.forEach(row => {
        allRows.push(row);
      });
    }
  });
  // Replace the element with the block table
  const block = WebImporter.DOMUtils.createTable(allRows, document);
  element.replaceWith(block);
}
