/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each card is a direct child of the grid
  const cardDivs = Array.from(grid.children);

  // Table header row
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // For each card div, extract the image and ensure there are two columns per row
  cardDivs.forEach((cardDiv) => {
    const imgContainer = cardDiv.querySelector('.utility-aspect-2x3');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    if (img) {
      // Always push two columns: image and empty string for text content
      rows.push([img, '']);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
