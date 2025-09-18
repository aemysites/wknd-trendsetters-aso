/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Must have at least 2 columns

  // The header row as specified
  const headerRow = ['Columns (columns14)'];

  // The content row: each column's content in its own cell
  // Do not split further; use the whole child element for each cell
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
