/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left content, right image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: all text and button content
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Header row: must match exactly
  const headerRow = ['Columns (columns27)'];

  // Second row: reference the actual DOM nodes
  const secondRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
