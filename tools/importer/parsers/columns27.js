/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be 2: content and image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: all content (text, heading, button)
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Header row must match block name exactly
  const headerRow = ['Columns (columns27)'];

  // Second row: use references to the actual elements
  const secondRow = [leftCol, rightCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
