/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be columns)
  const columns = Array.from(grid.children);

  // Defensive: check if we have at least two columns
  if (columns.length < 2) return;

  // Header row must be EXACTLY one column with block name
  const headerRow = ['Columns (columns7)'];

  // Second row: each column's full content as a cell
  const columnsRow = columns.map(col => col);

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
