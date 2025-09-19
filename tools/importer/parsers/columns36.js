/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // 1. Find the two main columns: left (text/buttons) and right (images)
  const container = element.querySelector('.container');
  if (!container) return;

  // The grid-layout contains two main children: left and right
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = getDirectChildren(grid, 'div');
  if (gridChildren.length < 2) return;

  // Left column: heading, subheading, buttons
  const leftCol = gridChildren[0];
  // Right column: grid of images
  const rightCol = gridChildren[1];

  // For leftCol, collect all content as a single block
  // (h1, p, and button group)
  const leftContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // For rightCol, get all images (in a nested grid)
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose the table
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftContent, images];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
