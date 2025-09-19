/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card data from an anchor element
  function extractCardData(cardAnchor) {
    // Find image (mandatory for this block)
    const image = cardAnchor.querySelector('img');
    if (!image) return null; // Skip cards without image
    // Compose text cell content by including all text content from the card
    const textCell = document.createElement('div');
    // Include all headings (h3)
    cardAnchor.querySelectorAll('h3').forEach(h => textCell.appendChild(h.cloneNode(true)));
    // Include all descriptions (div.paragraph-sm)
    cardAnchor.querySelectorAll('.paragraph-sm').forEach(d => textCell.appendChild(d.cloneNode(true)));
    // Include any other text nodes directly under the card anchor (for flexibility)
    Array.from(cardAnchor.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textCell.appendChild(document.createTextNode(node.textContent.trim()));
      }
    });
    // Also include any text from nested divs that are not .paragraph-sm or h3
    cardAnchor.querySelectorAll('div:not(.paragraph-sm):not(.utility-aspect-3x2)').forEach(div => {
      // Only add if it contains text
      if (div.textContent.trim()) {
        textCell.appendChild(document.createTextNode(div.textContent.trim()));
      }
    });
    return [image, textCell.childNodes.length ? textCell : ''];
  }

  // Find all tab panes (each tab holds a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [['Cards (cards28)']]; // Header row

  tabPanes.forEach(tabPane => {
    // Find the grid inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Find all card anchors inside the grid
    const cardAnchors = grid.querySelectorAll('a.utility-link-content-block');
    cardAnchors.forEach(cardAnchor => {
      const cardData = extractCardData(cardAnchor);
      if (cardData) {
        rows.push(cardData);
      }
    });
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
