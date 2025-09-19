/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (holds columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns.find((el) => el.tagName === 'IMG');
  // Second column: content div
  const contentCol = columns.find((el) => el !== imageCol);

  // Defensive: ensure both columns exist
  if (!imageCol || !contentCol) return;

  // Table header row
  const headerRow = ['Columns (columns32)'];

  // Table second row: two columns, image and content
  const contentRow = [imageCol, contentCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
