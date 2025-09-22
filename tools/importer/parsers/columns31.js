/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid-layout container (the direct child of the .container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid-layout (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));
  if (columns.length === 0) return;

  // Table header row
  const headerRow = ['Columns (columns31)'];

  // Table content row: each column's content as a cell
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
