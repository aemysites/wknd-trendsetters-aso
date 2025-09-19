/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid-layout container (the direct child of the top-level container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all immediate children (columns) of the grid
  const columns = Array.from(grid.children);

  // Defensive: Only process if we have at least one column
  if (columns.length === 0) return;

  // Table header row: always use the specified block name
  const headerRow = ['Columns (columns31)'];

  // Second row: one cell per column, each cell contains the entire column's content
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
