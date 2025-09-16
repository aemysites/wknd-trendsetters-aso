/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row as required
  const headerRow = ['Columns (columns31)'];

  // Second row: each column's content as a cell
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
