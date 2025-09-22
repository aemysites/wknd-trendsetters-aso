/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns (columns30)'];

  // Build the content row: each column gets its own cell
  const contentRow = columns.map((col) => col);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
