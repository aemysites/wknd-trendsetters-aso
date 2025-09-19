/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if there are at least 2 columns
  if (columns.length < 2) return;

  // Build the header row as required
  const headerRow = ['Columns (columns4)'];

  // Build the columns row: each cell is a column's content
  const columnsRow = columns.map(col => col);

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
