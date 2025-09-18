/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text and buttons
  const leftCol = columns[0];

  // Right column: images grid
  const rightCol = columns[1];
  let images = [];
  // Defensive: images may be inside another grid
  const imageGrid = rightCol.querySelector('.w-layout-grid');
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  } else {
    images = Array.from(rightCol.querySelectorAll('img'));
  }

  // Compose the table
  const headerRow = ['Columns (columns36)'];
  // For the images column, pass the array of image elements directly
  const contentRow = [leftCol, images];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
