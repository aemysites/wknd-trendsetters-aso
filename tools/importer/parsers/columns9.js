/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns (columns9)'];

  // Build the columns row: each cell is the content of a column
  // For each column, we want to preserve its content as-is
  const contentRow = columns.map((col) => col);

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
