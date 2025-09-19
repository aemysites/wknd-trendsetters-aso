/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (the one with two children: left content, right image)
  const grid = element.querySelector('.w-layout-grid.grid-layout.container');
  if (!grid) return;

  // The left column: content
  const leftCol = grid.children[0];
  // The right column: image
  // The image is outside the inner grid, as the second child of the outer grid
  const rightCol = grid.nextElementSibling;

  // Defensive: ensure we have both columns
  if (!leftCol || !rightCol) return;

  // Prepare left column content: heading, paragraph, buttons
  const heading = leftCol.querySelector('h2');
  const paragraph = leftCol.querySelector('.rich-text, .w-richtext');
  const buttonGroup = leftCol.querySelector('.button-group');

  // Compose left cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (paragraph) leftCellContent.push(paragraph);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Compose right cell content (the image element)
  const rightCellContent = rightCol;

  // Build the table rows
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
