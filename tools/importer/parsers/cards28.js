/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards28)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');

  tabPanes.forEach((tabPane) => {
    // Find the grid inside each tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get all cards (each card is an <a> inside the grid)
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Find image (mandatory)
      let image = card.querySelector('img');
      if (!image) return; // Skip cards without images
      // Text content: gather all heading and paragraph elements
      const textCell = [];
      // Get all h3 and .paragraph-sm inside card
      const headings = card.querySelectorAll('h3');
      headings.forEach(h => textCell.push(h));
      const paragraphs = card.querySelectorAll('.paragraph-sm');
      paragraphs.forEach(p => textCell.push(p));
      // Fallback: if no .paragraph-sm, get all direct text nodes and divs without images
      if (textCell.length === 0) {
        // Get all divs that do not contain images
        const divs = Array.from(card.querySelectorAll('div')).filter(div => !div.querySelector('img'));
        divs.forEach(div => textCell.push(div));
        // Also get direct text nodes
        Array.from(card.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            textCell.push(node.textContent.trim());
          }
        });
      }
      // Compose row: [image, text]
      rows.push([
        image,
        textCell.length ? textCell : ''
      ]);
    });
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
