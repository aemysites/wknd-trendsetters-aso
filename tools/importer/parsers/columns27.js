/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: text content (all children)
  const textCol = columns[0];
  // Second column: image (should be <img>)
  const imgCol = columns[1];

  // Header row: must match target block name exactly
  const headerRow = ['Columns (columns27)'];

  // Second row: left cell is all text content, right cell is the image element
  // Reference the existing elements, do not clone
  const row = [textCol, imgCol];

  // Table cells
  const cells = [headerRow, row];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
