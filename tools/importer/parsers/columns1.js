/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be image and content div)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image
  const imageCol = gridChildren.find(child => child.tagName === 'IMG');
  // Second column: text content (heading, subheading, buttons)
  const contentCol = gridChildren.find(child => child.tagName !== 'IMG');

  // Defensive: if not found, fallback to first/second
  const col1 = imageCol || gridChildren[0];
  const col2 = contentCol || gridChildren[1];

  // Build the table rows
  const headerRow = ['Columns (columns1)'];
  const columnsRow = [col1, col2];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
