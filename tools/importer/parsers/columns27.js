/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be two: content and image columns)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: the content block (with text, heading, button)
  const contentCol = gridChildren[0];
  // Second column: the image
  const imageCol = gridChildren[1];

  // Table header row - must match block name exactly
  const headerRow = ['Columns (columns27)'];

  // Table content row: reference the actual DOM nodes, not clones or new elements
  const contentRow = [contentCol, imageCol];

  // Build the table using the DOMUtils helper
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
