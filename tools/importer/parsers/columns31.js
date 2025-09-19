/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row exactly as required
  const headerRow = ['Columns (columns31)'];

  // Each column cell should reference the actual DOM node (not clone or new)
  const columnsRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
