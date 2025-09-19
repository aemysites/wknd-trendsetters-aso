/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children).filter(col => col && col.childNodes.length > 0);

  // Build the header row exactly as required
  const headerRow = ['Columns (columns9)'];

  // Each cell is the actual DOM node for that column, preserving all content and semantics
  const columnsRow = columns.map(col => col);

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
