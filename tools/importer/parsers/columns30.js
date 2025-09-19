/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column cell)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The block header row must match the spec exactly
  const headerRow = ['Columns (columns30)'];

  // Each column cell must reference the original element (no cloning)
  const columnsRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the section with the table
  element.replaceWith(table);
}
