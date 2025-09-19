/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be two: image, and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: the image
  const imageCol = columns[0];
  // Second column: the content (heading, subheading, buttons)
  const contentCol = columns[1];

  // Table header row
  const headerRow = ['Columns (columns1)'];
  // Table content row: two columns
  const contentRow = [imageCol, contentCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
