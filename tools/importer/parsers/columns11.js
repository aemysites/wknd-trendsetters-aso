/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find the two main columns: left (content), right (image)
  const leftCol = grid.querySelector('.grid-layout.container');
  const rightCol = grid.querySelector('img');

  if (!leftCol || !rightCol) return;

  // Collect all direct children of leftCol as content
  const leftColContent = Array.from(leftCol.children);
  // Reference the image element directly for rightCol
  const rightColContent = rightCol;

  // Build the table rows
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftColContent, rightColContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
