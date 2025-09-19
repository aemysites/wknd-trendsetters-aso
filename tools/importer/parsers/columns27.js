/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be two: content and image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: the content block (text, heading, button, etc.)
  const contentCol = gridChildren[0];
  // Second column: the image
  const imageCol = gridChildren[1];

  // Build the table rows
  const headerRow = ['Columns (columns27)'];
  const columnsRow = [contentCol, imageCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
