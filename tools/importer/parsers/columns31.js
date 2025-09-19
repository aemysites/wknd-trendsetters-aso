/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Block header row (must match exactly)
  const headerRow = ['Columns (columns31)'];

  // Second row: each cell contains all content from the corresponding column
  // Reference existing elements, preserve semantic structure
  const row = columns.map((col) => {
    // If column is empty, return an empty string
    if (!col.children.length) return '';
    // If only one child, reference it directly
    if (col.children.length === 1) return col.firstElementChild;
    // Otherwise, return an array of all children
    return Array.from(col.children);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the element with the table
  element.replaceWith(table);
}
