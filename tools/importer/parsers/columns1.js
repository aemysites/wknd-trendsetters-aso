/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid
  const gridChildren = Array.from(grid.children);
  // Expecting two columns: image and content
  if (gridChildren.length < 2) return;

  // First column: image
  const image = gridChildren.find((el) => el.tagName === 'IMG');
  // Second column: content block
  const contentBlock = gridChildren.find((el) => el !== image);

  // Defensive: ensure both columns exist
  if (!image || !contentBlock) return;

  // Table header row
  const headerRow = ['Columns (columns1)'];

  // Table content row: image in first cell, content in second cell
  const contentRow = [image, contentBlock];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
