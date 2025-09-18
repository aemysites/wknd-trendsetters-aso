/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container (may be the element itself or a child)
  let grid = element.querySelector('.grid-layout');
  if (!grid && element.classList.contains('grid-layout')) {
    grid = element;
  }
  if (!grid) {
    // If not found, fallback to direct children
    grid = element;
  }

  // Get all direct column children (defensive for variations)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));

  // Table header row: always one column
  const headerRow = ['Columns (columns31)'];

  // Second row: one cell per column
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
