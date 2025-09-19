/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards17) block: 2 columns, header row, each card = [image, text]
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Each immediate child of grid is a card wrapper
  const cardDivs = Array.from(grid.children);

  cardDivs.forEach((cardDiv) => {
    // Find the image inside this card
    const imgContainer = cardDiv.querySelector('.utility-aspect-2x3');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }
    if (!imgEl) return;

    // Extract text content from the cardDiv itself
    // Only include visible text, skip alt text and hidden nodes
    let textContent = '';
    // Get all direct text nodes inside cardDiv (not inside the image container)
    Array.from(cardDiv.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textContent += node.textContent.trim() + ' ';
      }
      // If it's an element and not the image container, get its text
      if (node.nodeType === Node.ELEMENT_NODE && node !== imgContainer) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();

    // If no text content, do not add an unnecessary empty column
    if (textContent) {
      rows.push([imgEl, textContent]);
    } else {
      rows.push([imgEl]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
