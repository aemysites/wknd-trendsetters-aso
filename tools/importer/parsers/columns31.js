/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column cell)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row
  const headerRow = ['Columns (columns31)'];

  // Table content row: each cell is the full content of a column
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element with the block table
  element.replaceWith(table);
}
