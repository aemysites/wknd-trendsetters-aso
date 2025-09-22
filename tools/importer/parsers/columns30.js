/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with 3 columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row exactly as required
  const headerRow = ['Columns (columns30)'];

  // Build the columns row: each cell is the referenced column element
  const columnsRow = columns.map((col) => col);

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
