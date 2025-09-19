/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Defensive: Find the grid-layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each is a column cell)
  const columns = Array.from(grid.children);

  // Second row: each column's content
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
