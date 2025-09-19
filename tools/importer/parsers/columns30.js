/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If no columns, do nothing
  if (!columns.length) return;

  // Table header row as per block requirements
  const headerRow = ['Columns (columns30)'];

  // Second row: each column's content goes in a cell
  // For this block, the visual layout is three columns side by side
  // Place each column's content as-is in the cell
  const contentRow = columns.map(col => col);

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
