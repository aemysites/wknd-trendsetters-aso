/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each column's content)
  const columns = Array.from(grid.children);

  // Defensive: If there are fewer than 2 columns, don't build a columns block
  if (columns.length < 2) return;

  // Build the header row
  const headerRow = ['Columns (columns30)'];

  // Build the columns row: each cell is the content of a column
  // For this block, the visual layout is 3 columns side by side
  const columnsRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
