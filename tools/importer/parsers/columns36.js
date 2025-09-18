/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the two main children: left content and right images
  const children = Array.from(grid.children);
  if (children.length < 2) return;

  // Left column: headline, paragraph, buttons
  const leftCol = children[0];

  // Right column: grid of images
  const rightCol = children[1];
  // Defensive: find the inner grid with images
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose the columns row
  // Column 1: left content block
  // Column 2+: each image as its own column
  const columnsRow = [leftCol, ...images];

  // Table header
  const headerRow = ['Columns (columns36)'];

  // Build table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
