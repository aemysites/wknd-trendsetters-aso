/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container holding the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: heading (h2)
  const heading = columns[0];
  // Second column: content (paragraph, button)
  const content = columns[1];

  // Build the header row exactly as required
  const headerRow = ['Columns (columns7)'];

  // For the first cell, reference the heading element directly
  const col1 = heading;

  // For the second cell, reference all children of the content column
  let col2;
  if (content.children.length > 0) {
    col2 = Array.from(content.children);
  } else {
    col2 = content;
  }

  // Build the table rows
  const columnsRow = [col1, col2];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
