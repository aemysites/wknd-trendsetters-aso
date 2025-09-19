/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each card)
  const cardDivs = Array.from(grid.children);

  // Build the table rows
  const rows = [];
  // Header row as specified
  rows.push(['Cards (cards17)']);

  cardDivs.forEach((cardDiv) => {
    // Find the image element
    const imgWrap = cardDiv.querySelector(':scope > div');
    let img = null;
    if (imgWrap) {
      img = imgWrap.querySelector('img');
    }
    // Defensive: If no image, skip this card
    if (!img) return;

    // There is no text content for these cards in the source HTML, so omit the second cell entirely
    // Only add the image in its own cell
    rows.push([img, '']);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
