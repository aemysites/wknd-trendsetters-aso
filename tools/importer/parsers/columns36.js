/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node by tag
  function getChildrenByTag(parent, tag) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tag);
  }

  // 1. Find the main grid (two columns: left text/buttons, right images)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: heading, subheading, buttons
  const leftCol = gridChildren[0];
  // Right column: grid of images
  const rightCol = gridChildren[1];

  // -- LEFT COLUMN CONTENT --
  // Get heading, subheading, and button group
  const heading = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');
  // Compose left cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // -- RIGHT COLUMN CONTENT --
  // Find the inner grid with images
  let images = [];
  const innerGrid = rightCol.querySelector('.grid-layout');
  if (innerGrid) {
    images = Array.from(innerGrid.querySelectorAll('img'));
  }
  // Compose right cell content
  const rightCellContent = images;

  // 2. Build the table rows
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftCellContent, rightCellContent];

  // 3. Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 4. Replace the original element
  element.replaceWith(table);
}
