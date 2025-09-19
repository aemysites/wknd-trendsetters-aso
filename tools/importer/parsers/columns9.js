/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container inside the footer
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // The header row as required
  const headerRow = ['Columns (columns9)'];

  // Each column's content goes into a cell in the second row
  // Reference the whole column element for resilience
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
