/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid-layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));

  // Prepare the header row
  const headerRow = ['Columns (columns31)'];

  // Prepare the columns row: each cell is the content of one column
  // For resilience, include the whole column element in each cell
  const columnsRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
