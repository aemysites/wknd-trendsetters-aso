/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards17)'];

  // Defensive: find the grid container (cards)
  const centered = element.querySelector('.centered');
  if (!centered) return;
  const grid = centered.querySelector('.grid-layout');
  if (!grid) return;

  // Each child div of grid-layout is a card
  const cardDivs = Array.from(grid.children);

  // For each card, extract the image element and any text content from alt attribute
  const rows = cardDivs.map(cardDiv => {
    // Defensive: find the image inside the card
    const imgContainer = cardDiv.querySelector('.utility-aspect-2x3');
    let img = null;
    let textContent = '';
    if (imgContainer) {
      img = imgContainer.querySelector('img');
      if (img && img.alt) {
        textContent = img.alt;
      }
    }
    if (!img) return null;
    // If no alt text, use a non-breaking space
    if (!textContent) textContent = '\u00A0';
    return [img, textContent];
  }).filter(row => row && row[0]);

  // Compose the table cells
  const cells = [headerRow, ...rows];

  // Always output the block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
