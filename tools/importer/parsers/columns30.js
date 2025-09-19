/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If no columns found, do nothing
  if (!columns.length) return;

  // Build header row
  const headerRow = ['Columns (columns30)'];

  // Build columns row: each column is a cell
  const columnsRow = columns.map(col => col);

  // Compose table data
  const tableData = [
    headerRow,
    columnsRow,
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
