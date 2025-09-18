/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: left (content), right (image)
  const columns = Array.from(grid.children);

  // Defensive: ensure we have at least two columns
  if (columns.length < 2) return;

  // Identify left column (should contain heading) and right column (should be image)
  let leftCol = null;
  let rightCol = null;
  columns.forEach(col => {
    if (!leftCol && col.querySelector('h2, .h2-heading')) {
      leftCol = col;
    } else if (!rightCol && col.tagName === 'IMG') {
      rightCol = col;
    }
  });

  if (!leftCol || !rightCol) return;

  // Table header row: block name as per instructions
  const headerRow = ['Columns (columns5)'];

  // Table second row: leftCol and rightCol DOM references
  const secondRow = [leftCol, rightCol];

  // Build the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
