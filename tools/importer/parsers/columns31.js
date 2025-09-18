/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row as required
  const headerRow = ['Columns (columns31)'];

  // Second row: each cell is the content of a column
  // For resilience, reference the entire column div for each cell
  const contentRow = columns.map(col => col);

  // Build the table
  const tableCells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
