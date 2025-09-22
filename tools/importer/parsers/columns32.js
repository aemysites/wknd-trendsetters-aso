/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be 2: image, content)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image
  const imageCol = gridChildren[0];
  // Second column: content (text, tags, heading, author info)
  const contentCol = gridChildren[1];

  // Table header row
  const headerRow = ['Columns (columns32)'];
  // Table content row: two columns
  const contentRow = [imageCol, contentCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
