/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Columns (columns1)'];

  // 2. Find the columns in the source HTML
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of grid (should be [img, div])
  const columns = Array.from(grid.children);

  // Defensive: Expecting at least 2 columns
  if (columns.length < 2) return;

  // First column: image
  const imgCol = columns.find(el => el.tagName === 'IMG');
  // Second column: content div
  const contentCol = columns.find(el => el.tagName !== 'IMG');

  // Defensive: ensure both columns exist
  if (!imgCol || !contentCol) return;

  // For the content column, extract all its children as a block
  // This includes h1, p, and the button group
  const contentChildren = Array.from(contentCol.children);

  // Compose the content column as an array of its children
  const contentCell = contentChildren;

  // Compose the table rows
  // Ensure each row is an array in the cells array
  const cells = [];
  cells.push(headerRow); // Header row: one column
  cells.push([imgCol, contentCell]); // Second row: two columns

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
