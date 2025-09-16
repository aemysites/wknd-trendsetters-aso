/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container (contains both columns)
  const grid = element.querySelector('.grid-layout');
  let leftCol, rightCol;

  // Find all immediate children of the main grid
  const gridChildren = Array.from(grid.children);

  // Find the left column (content) and right column (image)
  // The left column is a div with another grid inside, the right is an img
  leftCol = gridChildren.find(child => child.tagName === 'DIV');
  rightCol = gridChildren.find(child => child.tagName === 'IMG');

  // Defensive: If nested grid, get the actual content div
  let contentDiv = leftCol;
  if (leftCol && leftCol.querySelector('.section')) {
    contentDiv = leftCol.querySelector('.section');
  }

  // Compose left column content: heading, paragraph, buttons
  const heading = contentDiv.querySelector('h2');
  const paragraph = contentDiv.querySelector('.rich-text, .w-richtext');
  const buttonGroup = contentDiv.querySelector('.button-group');

  // Compose left cell: heading, paragraph, buttons
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (paragraph) leftCellContent.push(paragraph);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Compose right cell: image
  const rightCellContent = rightCol ? [rightCol] : [];

  // Table header row
  const headerRow = ['Columns (columns5)'];
  // Table content row: left and right columns
  const contentRow = [leftCellContent, rightCellContent];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
