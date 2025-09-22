/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!grid) return;

  // Get all direct children of the main grid
  const columns = Array.from(grid.children);

  // Find the content column (text/buttons)
  let contentCol = null;
  let imageCol = null;
  columns.forEach((col) => {
    if (col.querySelector('h2')) {
      contentCol = col;
    } else if (col.tagName === 'IMG') {
      imageCol = col;
    }
  });

  // Defensive: if not found, fallback to first/second
  if (!contentCol && columns.length > 0) contentCol = columns[0];
  if (!imageCol && columns.length > 1) imageCol = columns[1];

  // Compose left column: heading, paragraph, buttons
  let leftCol = [];
  if (contentCol) {
    // Heading
    const heading = contentCol.querySelector('h2');
    if (heading) leftCol.push(heading);
    // Paragraph
    const para = contentCol.querySelector('.rich-text, .w-richtext, p');
    if (para) leftCol.push(para);
    // Buttons
    const btnGroup = contentCol.querySelector('.button-group');
    if (btnGroup) leftCol.push(btnGroup);
  }

  // Compose right column: image
  let rightCol = [];
  if (imageCol && imageCol.tagName === 'IMG') {
    rightCol.push(imageCol);
  }

  // Table rows
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftCol, rightCol];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
