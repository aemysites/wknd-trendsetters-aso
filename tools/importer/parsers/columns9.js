/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Prepare header row
  const headerRow = ['Columns (columns9)'];

  // Prepare content row: each cell is a column's content
  const contentRow = columns.map((col) => col);

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
