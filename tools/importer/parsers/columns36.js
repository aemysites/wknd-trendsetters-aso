/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct child by selector
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Columns (columns36)'];

  // 2. Find the two main columns from the grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = getDirectChild(container, '.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: heading, subheading, buttons
  const leftCol = gridChildren[0];
  const leftColContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftColContent.push(heading);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftColContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftColContent.push(buttonGroup);

  // Right column: grid of images
  const rightCol = gridChildren[1];
  let rightColContent = [];
  const imagesGrid = rightCol.querySelector('.grid-layout');
  if (imagesGrid) {
    const imgs = Array.from(imagesGrid.querySelectorAll('img'));
    if (imgs.length) rightColContent = imgs;
  }

  // 2nd row: two columns
  const row2 = [leftColContent, rightColContent];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row2
  ], document);

  element.replaceWith(table);
}
