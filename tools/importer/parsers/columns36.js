/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid containing columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: Heading, subheading, buttons
  const leftCol = columns[0];
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Buttons
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) {
    buttonGroup.querySelectorAll('a').forEach(btn => leftContent.push(btn));
  }

  // RIGHT COLUMN: Images
  const rightCol = columns[1];
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  const images = imagesGrid ? Array.from(imagesGrid.querySelectorAll('img')) : [];

  // Compose the table
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftContent, images];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
