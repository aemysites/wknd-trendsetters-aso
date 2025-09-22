/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children of a node with a tag name
  function getDirectChildrenByTag(parent, tag) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tag.toLowerCase());
  }

  // Find the main grid (two columns: left text/buttons, right images)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: Heading, subheading, buttons
  const leftCol = columns[0];
  const h1 = leftCol.querySelector('h1');
  const p = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');
  // Compose left cell content
  const leftCellContent = [];
  if (h1) leftCellContent.push(h1);
  if (p) leftCellContent.push(p);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // RIGHT COLUMN: 3 images in a grid
  const rightCol = columns[1];
  // The images are inside a nested grid
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }
  // Compose right cell content
  const rightCellContent = images;

  // Build the table rows
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
