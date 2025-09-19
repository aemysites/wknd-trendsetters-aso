/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of the grid is a column
  const columns = Array.from(grid.children);

  // Table header must match the block name exactly
  const headerRow = ['Columns (columns9)'];

  // Each column's cell should reference the original element (not clone)
  const contentRow = columns.map((col) => col);

  // Create the table with the correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
