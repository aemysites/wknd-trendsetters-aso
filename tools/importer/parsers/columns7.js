/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // The grid's immediate children are the columns
  const columns = Array.from(grid.children);

  // Build the header row (must be a single cell array)
  const headerRow = ['Columns (columns7)'];

  // Build the content row: each column's content as a cell (not wrapped in an array)
  const contentRow = columns.map(col => col);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
