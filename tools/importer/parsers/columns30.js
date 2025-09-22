/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the main columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);

  // Defensive: skip if no columns found
  if (columns.length === 0) return;

  // Table structure: header row, then columns row
  // Use the required block name as header
  const tableCells = [
    ['Columns (columns30)'],
    columns.map((col) => col), // reference original elements
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
