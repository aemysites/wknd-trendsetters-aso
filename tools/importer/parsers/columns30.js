/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (3 columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns visually)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row must match block name exactly
  const headerRow = ['Columns (columns30)'];

  // Table second row: each column's content (reference, not clone)
  const secondRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace the section with the table
  element.replaceWith(table);
}
