/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Each column cell should reference the existing element, preserving all content
  const columnCells = columns.map(col => col);

  // Table header row must match target block name exactly
  const headerRow = ['Columns (columns9)'];

  // Table rows: header + columns row
  const rows = [headerRow, columnCells];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
