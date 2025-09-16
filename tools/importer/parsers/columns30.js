/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row (block name)
  const headerRow = ['Columns (columns30)'];

  // Build the columns row: each cell is one column's content
  // Reference the entire column element for resilience
  const columnsRow = columns.map((col) => col);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
