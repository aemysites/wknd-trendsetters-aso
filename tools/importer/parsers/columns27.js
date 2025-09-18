/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // 3. The first column is a div with all the text/buttons, the second is an image
  const firstCol = columns[0];
  const secondCol = columns[1];

  // 4. Build the table rows
  const headerRow = ['Columns (columns27)']; // Block name as required
  const contentRow = [firstCol, secondCol]; // Reference DOM nodes directly

  // 5. Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 6. Replace the original element with the new table
  element.replaceWith(table);
}
