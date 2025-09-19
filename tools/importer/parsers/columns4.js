/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns (columns4)'];

  // Build the columns row
  // Each cell should contain the full content of each column
  const columnsRow = columns.map((col) => col);

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
