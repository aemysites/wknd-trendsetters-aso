/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate grid children (each is a card wrapper)
  const cardDivs = Array.from(grid.children);

  // Table header
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // For each card, extract image (first cell), and text content (second cell)
  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    const imageCell = img ? img : '';
    let textCell = '';
    // Try to get all text from the cardDiv (including alt text, figcaption, etc.)
    // Use less specific selector to include all possible text
    // Collect all text nodes under cardDiv except inside <img>
    const walker = document.createTreeWalker(cardDiv, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        // Ignore whitespace-only nodes
        if (!node.textContent.trim()) return NodeFilter.FILTER_SKIP;
        // Ignore text inside <img>
        if (node.parentNode && node.parentNode.tagName === 'IMG') return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let textParts = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      textParts.push(currentNode.textContent.trim());
    }
    // If nothing found, fallback to alt text
    if (textParts.length === 0 && img && img.alt) {
      textParts.push(img.alt);
    }
    textCell = textParts.join(' ');
    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
