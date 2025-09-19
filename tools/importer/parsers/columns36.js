/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;
  const gridChildren = Array.from(mainGrid.children);

  // Defensive: Expecting two main columns (left: text/buttons, right: images)
  let leftCol = null;
  let rightCol = null;
  if (gridChildren.length >= 2) {
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  } else {
    // fallback: treat all as one column
    leftCol = mainGrid;
  }

  // Left column: headline, subheading, buttons
  let leftContent = [];
  if (leftCol) {
    // headline
    const headline = leftCol.querySelector('h1');
    if (headline) leftContent.push(headline);
    // subheading
    const subheading = leftCol.querySelector('p');
    if (subheading) leftContent.push(subheading);
    // button group
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftContent.push(buttonGroup);
  }

  // Right column: images (in a grid)
  let rightContent = [];
  if (rightCol) {
    // Find the grid containing images
    const imageGrid = rightCol.querySelector('.grid-layout');
    if (imageGrid) {
      // Only images
      const images = Array.from(imageGrid.querySelectorAll('img'));
      if (images.length) {
        rightContent = images;
      }
    }
  }

  // Table structure: header row, then one row with two columns
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
