/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container inside the footer
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // The block header row
  const headerRow = ['Columns (columns9)'];

  // The content row: each cell is a column's content
  // For resilience, reference the entire column element
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
