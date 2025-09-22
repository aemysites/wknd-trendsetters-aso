/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left column, right column)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: text content (may include headings, paragraphs, button)
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Prepare the header row
  const headerRow = ['Columns (columns27)'];

  // Second row: left column (all content), right column (image)
  // Reference the actual elements, not clones or URLs
  const secondRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
