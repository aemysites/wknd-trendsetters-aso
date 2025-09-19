/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the main container and grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Step 2: LEFT COLUMN (text)
  const leftCol = columns[0];
  const leftContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Step 3: RIGHT COLUMN (images)
  const rightCol = columns[1];
  let images = [];
  const imageGrid = rightCol.querySelector('.w-layout-grid');
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Step 4: Build the Columns block table
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftContent, images];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Step 5: Replace the element
  element.replaceWith(table);
}
