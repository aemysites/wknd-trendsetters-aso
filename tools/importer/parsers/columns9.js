/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Table header row
  const headerRow = ['Columns (columns9)'];

  // Second row: each column's content as a cell
  // For robustness, we include each column's entire content block
  const secondRow = columns.map((col) => col);

  // Table rows array
  const rows = [headerRow, secondRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
