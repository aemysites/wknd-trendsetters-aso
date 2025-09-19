/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor element
  function extractCardInfo(cardAnchor) {
    let image = cardAnchor.querySelector('img') || '';
    // For text: get all heading and paragraph elements inside the card anchor (not just h3/.paragraph-sm)
    const textCell = [];
    // Get all heading and paragraph-like elements in order
    cardAnchor.querySelectorAll('h1, h2, h3, h4, h5, h6, .paragraph-sm, p').forEach(el => {
      textCell.push(el);
    });
    // Also include any additional text nodes that are direct children (for flexibility)
    Array.from(cardAnchor.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textCell.push(document.createTextNode(node.textContent.trim()));
      }
    });
    return [image, textCell];
  }

  // Find all tab panes (each tab is a set of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [];

  // Always start with header row
  const headerRow = ['Cards (cards28)'];
  rows.push(headerRow);

  tabPanes.forEach((tabPane) => {
    // Find the grid inside this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an anchor (a)
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((cardAnchor) => {
      const [image, textCell] = extractCardInfo(cardAnchor);
      // Only add if there is an image (mandatory for this variant)
      if (image && textCell.length > 0) {
        rows.push([image, textCell]);
      }
    });
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
