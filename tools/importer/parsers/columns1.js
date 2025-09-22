/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be: [image, content div])
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image element (reference, not clone)
  const imageCol = gridChildren[0];
  // Second column: content div (reference, not clone)
  const contentCol = gridChildren[1];

  // Ensure all content is included
  // No hardcoded strings, all content comes from the element

  // Table header must match exactly
  const headerRow = ['Columns (columns1)'];
  const contentRow = [imageCol, contentCol];

  // Create the table with WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
