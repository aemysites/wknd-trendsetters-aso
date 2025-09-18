/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (each is a column)
  const columns = Array.from(grid.children);

  // Build the header row using the target block name exactly
  const headerRow = ['Columns (columns35)'];

  // Build the columns row: each cell contains the full content of each column
  const columnsRow = columns.map((col) => col);

  // Compose the table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
