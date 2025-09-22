/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (columns wrapper)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Table header row (must match block name exactly, and be a single column)
  const headerRow = ['Columns (columns7)'];

  // Table content row: each cell is a reference to the original column element
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
