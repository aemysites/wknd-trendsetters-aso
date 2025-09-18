/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);

  // Block header row
  const headerRow = ['Columns (columns9)'];

  // Second row: each cell is a reference to the original column element
  const secondRow = columns.map(col => col);

  // Compose the table rows
  const rows = [headerRow, secondRow];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
