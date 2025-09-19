/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid as columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Block header row
  const headerRow = ['Columns (columns4)'];

  // Each column cell: reference the actual DOM node for full fidelity
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the new block
  element.replaceWith(table);
}
