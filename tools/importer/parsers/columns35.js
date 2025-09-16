/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Prepare the header row
  const headerRow = ['Columns (columns35)'];

  // Prepare the content row: each cell is one column's content
  // For each column, reference the element directly
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
