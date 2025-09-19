/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with block name
  const headerRow = ['Columns (columns36)'];

  // Defensive: Get the main grid containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // --- First column: Text and buttons ---
  const firstCol = columns[0];
  // Collect all content in first column
  const firstColContent = [];
  // Heading
  const heading = firstCol.querySelector('h1');
  if (heading) firstColContent.push(heading);
  // Subheading
  const subheading = firstCol.querySelector('p');
  if (subheading) firstColContent.push(subheading);
  // Buttons
  const buttonGroup = firstCol.querySelector('.button-group');
  if (buttonGroup) {
    // Use all buttons in the group
    const buttons = Array.from(buttonGroup.querySelectorAll('a'));
    firstColContent.push(...buttons);
  }

  // --- Second column: Images ---
  const secondCol = columns[1];
  // Defensive: Find the inner grid containing images
  const imagesGrid = secondCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  } else {
    // Fallback: find images directly in secondCol
    images = Array.from(secondCol.querySelectorAll('img'));
  }

  // --- Build table rows ---
  // Second row: two columns, left is text/buttons, right is images
  const secondRow = [firstColContent, images];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
