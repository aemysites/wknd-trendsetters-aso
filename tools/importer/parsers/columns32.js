/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be image and content div)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Identify the image and the content column
  const imageCol = gridChildren.find(el => el.tagName === 'IMG');
  const contentCol = gridChildren.find(el => el.tagName === 'DIV');

  // Defensive fallback if not found
  const col1 = imageCol || gridChildren[0];
  const col2 = contentCol || gridChildren[1];

  // Table header row must match block name exactly
  const headerRow = ['Columns (columns32)'];
  // Table columns row: reference the actual DOM nodes
  const columnsRow = [col1, col2];

  // Build the table using DOMUtils (references, not clones)
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);

  // Replace the section with the columns table
  element.replaceWith(table);
}
