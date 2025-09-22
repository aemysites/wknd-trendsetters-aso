/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (contains image and right column)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: image (reference the actual element)
  const leftCol = columns[0];
  // Right column: text content (reference the actual element)
  const rightCol = columns[1];

  // Table header row: must match block name exactly
  const headerRow = ['Columns (columns1)'];

  // Table second row: two columns side by side, referencing existing nodes
  const secondRow = [leftCol, rightCol];

  // Build table using DOMUtils (no markdown, only HTML)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
