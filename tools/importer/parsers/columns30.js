/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column cell)
  const columns = Array.from(grid.children);

  // Defensive: If no columns found, do nothing
  if (!columns.length) return;

  // Build the table rows
  const headerRow = ['Columns (columns30)'];
  const columnsRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
