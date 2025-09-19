/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of grid is a card wrapper
  const cardDivs = Array.from(grid.children);

  // Build the table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards17)'];
  rows.push(headerRow);

  // For each card, extract the image (first cell), and extract text content from the closest alt attribute (second cell)
  cardDivs.forEach(cardDiv => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    let textContent = '';
    if (img && img.alt) {
      textContent = img.alt;
    } else {
      // Try to get any text node inside the cardDiv
      const textNodes = Array.from(cardDiv.childNodes).filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      textContent = textNodes.map(node => node.textContent.trim()).join(' ');
      if (!textContent) textContent = 'Card';
    }
    if (img) {
      rows.push([img, textContent]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
