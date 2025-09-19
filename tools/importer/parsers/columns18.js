/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const children = Array.from(grid.children);

  // Identify left column (intro text), right column (contact list), and image
  let leftCol = children.find((el) => el.querySelector('h2, h3, p'));
  let rightCol = children.find((el) => el.tagName === 'UL');
  let image = children.find((el) => el.tagName === 'IMG');

  // Defensive fallback
  if (!leftCol) leftCol = children[0] || '';
  if (!rightCol) rightCol = children[1] || '';
  if (!image) image = children.find((el) => el.tagName === 'IMG') || '';

  // Table header: must match target block name exactly
  const headerRow = ['Columns (columns18)'];

  // Table second row: left (intro text), right (contact list)
  const secondRow = [leftCol, rightCol];

  // Table third row: image in left column only (remove unnecessary empty column)
  const thirdRow = [image];

  // Compose table cells
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
