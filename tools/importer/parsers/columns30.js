/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (should be only one)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: ensure all text and structure is preserved
  // Each cell is a reference to the original column element
  const columnsRow = columns.map((col) => col);

  // Table header row as required
  const headerRow = ['Columns (columns30)'];

  // Build the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
