/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be two: image and content)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image
  const imgCol = gridChildren.find(child => child.tagName === 'IMG');
  // Second column: content (text, tags, heading, meta)
  const contentCol = gridChildren.find(child => child !== imgCol);

  // Defensive: ensure both columns exist
  if (!imgCol || !contentCol) return;

  // Build the table rows
  const headerRow = ['Columns (columns32)'];
  const columnsRow = [imgCol, contentCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace original element with the new table
  element.replaceWith(table);
}
