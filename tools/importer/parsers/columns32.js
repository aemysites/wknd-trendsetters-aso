/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be image and content div)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image (reference the actual image element)
  const imageCol = gridChildren[0];
  // Second column: text content (reference the actual content element)
  const contentCol = gridChildren[1];

  // Table header must match block name exactly
  const headerRow = ['Columns (columns32)'];
  // Table row: reference elements, not clone or create new
  const columnsRow = [imageCol, contentCol];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
