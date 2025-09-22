/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (the one with two columns: content and image)
  const grid = element.querySelector('.grid-layout.grid-gap-xxl.utility-min-height-100dvh');
  if (!grid) return;

  // The left column: content (heading, paragraph, buttons)
  const leftCol = grid.querySelector('.container');
  // The right column: image (first <img> child of grid)
  const rightCol = grid.querySelector('img');

  if (!leftCol || !rightCol) return;

  // Use the block name as the header row
  const headerRow = ['Columns (columns11)'];

  // Reference the actual DOM nodes for the table cells
  const row = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
