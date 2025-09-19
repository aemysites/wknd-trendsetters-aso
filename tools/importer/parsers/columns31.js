/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the direct child of the main container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the table rows
  const headerRow = ['Columns (columns31)'];
  const contentRow = columns.map(col => col);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
