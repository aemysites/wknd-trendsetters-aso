/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container inside the block
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be [h2, div])
  const children = Array.from(grid.children);

  // Left column: h2
  const leftCol = children[0];
  // Right column: div (contains p and a.button)
  const rightCol = children[1];

  // Build the table rows
  const headerRow = ['Columns (columns7)'];
  const secondRow = [leftCol, rightCol];

  // Compose the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Ensure header row has exactly one column and NO colspan attribute
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].removeAttribute('colspan');
  }

  // Replace the original element
  element.replaceWith(table);
}
