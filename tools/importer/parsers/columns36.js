/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if the expected grid layout exists
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the two main columns: left (text/buttons), right (images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: heading, subheading, buttons
  const leftCol = columns[0];
  // Right column: grid of images
  const rightCol = columns[1];

  // Extract left column content
  // Heading
  const heading = leftCol.querySelector('h1');
  // Subheading
  const subheading = leftCol.querySelector('p');
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  // Compose left column cell
  const leftCell = [];
  if (heading) leftCell.push(heading);
  if (subheading) leftCell.push(subheading);
  if (buttonGroup) leftCell.push(buttonGroup);

  // Extract right column images
  // The images are inside a nested grid inside rightCol
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let imageElements = [];
  if (imagesGrid) {
    imageElements = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose right column cell
  // Place all images in a single cell, as per visual reference
  const rightCell = imageElements;

  // Build the table rows
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftCell, rightCell];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(blockTable);
}
