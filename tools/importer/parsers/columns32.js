/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Columns: image and content
  const columns = Array.from(grid.children);

  // Header row must match target block name exactly
  const headerRow = ['Columns (columns32)'];

  // Defensive: ensure exactly two columns
  let row;
  if (columns.length >= 2) {
    // Reference existing elements directly
    row = [columns[0], columns[1]];
  } else {
    // If missing, fill with empty cell
    row = [columns[0] || '', columns[1] || ''];
  }

  // Table structure: header, then columns row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
