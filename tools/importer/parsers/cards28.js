/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards28)'];
  const rows = [headerRow];

  // Helper to extract image from a card
  function getImage(card) {
    // Try to find an img inside the card
    const img = card.querySelector('img');
    return img || '';
  }

  // Helper to extract text content from a card
  function getTextContent(card) {
    // Create a fragment to hold heading and description
    const fragment = document.createDocumentFragment();
    const heading = card.querySelector('h3');
    if (heading) fragment.appendChild(heading);
    // Paragraph/description
    const desc = card.querySelector('.paragraph-sm');
    if (desc) fragment.appendChild(desc);
    return fragment.childNodes.length ? fragment : '';
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Find the grid inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a>
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // First cell: image (if present)
      const img = getImage(card);
      // Second cell: text content (heading + description)
      const textContent = getTextContent(card);
      // Only add row if there is at least text content
      if (img || textContent) {
        rows.push([
          img,
          textContent
        ]);
      }
    });
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
