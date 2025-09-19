/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout div (the columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If there are no columns, do nothing
  if (columns.length === 0) return;

  // Table header row (always one cell)
  const headerRow = ['Columns (columns4)'];

  // Table second row: one cell per column
  const secondRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
