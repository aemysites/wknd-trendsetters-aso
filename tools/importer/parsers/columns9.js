/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we're working with the expected structure
  if (!element || !document) return;

  // Table header row (block name)
  const headerRow = ['Columns (columns9)'];

  // Find the grid layout container (holds the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Compose the second row: each cell is the content of one column
  // We want to preserve the structure, so we reference the column elements directly
  const secondRow = columns.map(col => col);

  // Compose the table data
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
