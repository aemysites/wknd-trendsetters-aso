/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be image and content div)
  const gridChildren = Array.from(grid.children);

  // Find the image element (first child)
  const imgEl = gridChildren.find(el => el.tagName === 'IMG');

  // Find the content column (second child)
  const contentCol = gridChildren.find(el => el !== imgEl);

  // Defensive: If either column is missing, abort
  if (!imgEl || !contentCol) return;

  // Compose the columns row
  const columnsRow = [imgEl, contentCol];

  // Table header row as required
  const headerRow = ['Columns (columns32)'];

  // Compose the table cells
  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
