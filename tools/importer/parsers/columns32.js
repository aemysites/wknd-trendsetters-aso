/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns root)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid: [img, content div]
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: the image (reference the existing image element)
  const imgCol = gridChildren[0];
  // Second column: the content block (reference the existing content div)
  const contentCol = gridChildren[1];

  // Build the table rows
  const headerRow = ['Columns (columns32)'];
  const columnsRow = [imgCol, contentCol];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
