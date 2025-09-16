/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the columns (image, content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imgCol = columns[0];
  const img = imgCol.querySelector('img');

  // Second column: content
  const contentCol = columns[1];

  // Only add the image cell if the image exists
  const contentRow = [];
  if (img) contentRow.push(img);
  if (contentCol) contentRow.push(contentCol);

  // Build the table rows
  const headerRow = ['Columns (columns32)'];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
