/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Table header row as specified
  const headerRow = ['Columns (columns3)'];

  // Find the grid layout container (holds the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (each is a column)
  const columns = Array.from(grid.children);

  // Defensive: ensure at least one column
  if (columns.length === 0) return;

  // Second row: each cell is a column's content
  // Reference the entire column element for resilience
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
