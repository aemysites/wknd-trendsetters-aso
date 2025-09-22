/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row must match the target block name exactly
  const headerRow = ['Columns (columns4)'];

  // Second row: each cell is the full content of each column
  // Reference the actual DOM nodes for semantic fidelity
  const secondRow = columns.map(col => col);

  // Compose the table data
  const tableData = [headerRow, secondRow];

  // Create the table using the importer utility
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
