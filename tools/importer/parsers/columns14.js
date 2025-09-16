/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Table header row: must match block name exactly
  const headerRow = ['Columns (columns14)'];

  // Table second row: each cell is a column, referencing original elements
  const columnsRow = gridChildren.map((col) => col);

  // Compose table rows
  const rows = [headerRow, columnsRow];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table block
  element.replaceWith(table);
}
