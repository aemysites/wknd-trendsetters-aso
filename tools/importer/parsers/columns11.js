/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.grid-layout.container');
  if (!grid) return;

  // Find the left column (content) and right column (image)
  let leftCol = null;
  let rightCol = null;
  for (const child of grid.children) {
    if (!leftCol && child.tagName === 'DIV') leftCol = child;
    if (!rightCol && child.tagName === 'IMG') rightCol = child;
  }
  if (!leftCol || !rightCol) return;

  // The header row must match the target block name exactly
  const headerRow = ['Columns (columns11)'];
  // Each cell must be an array (table row)
  const rows = [headerRow, [leftCol, rightCol]];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element (section) to ensure DOM is modified
  element.replaceWith(table);
}
