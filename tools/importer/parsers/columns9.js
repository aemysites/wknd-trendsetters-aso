/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns (columns9)'];

  // Build the columns row: each cell is the full content of a column
  const columnsRow = columns.map((col) => col);

  // Table structure: header + columns row
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
