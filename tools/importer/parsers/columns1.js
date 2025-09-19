/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns1)'];

  // Find the grid layout (the two columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (should be [img, content div])
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns
  // First column: image
  // Second column: heading, subheading, buttons
  const col1 = gridChildren[0]; // image element
  const col2 = gridChildren[1]; // content div (contains h1, p, buttons)

  // Defensive: Only proceed if both columns exist
  if (!col1 || !col2) return;

  // Build the table rows
  const rows = [headerRow];

  // Second row: two columns, left image, right content
  rows.push([
    col1, // reference the existing image element
    col2  // reference the existing content div
  ]);

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
