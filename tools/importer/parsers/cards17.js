/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Each direct child of grid is a card wrapper
  const cardDivs = Array.from(grid.children);

  // Prepare the header row (must be exactly one column)
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // For each card, extract the image (first cell) and text content (second cell)
  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    let textContent = '';
    // Extract all text content from the cardDiv, excluding image alt
    // If there is no visible text, fallback to alt text
    // Get all text nodes that are not inside <img>
    const walker = document.createTreeWalker(cardDiv, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (node.parentNode.nodeName !== 'IMG' && node.textContent.trim()) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    });
    let node, texts = [];
    while ((node = walker.nextNode())) {
      texts.push(node.textContent.trim());
    }
    if (texts.length) {
      textContent = texts.join(' ');
    } else if (img && img.alt && img.alt.trim()) {
      textContent = img.alt.trim();
    }
    rows.push([img, textContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
