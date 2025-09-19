/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Identify the image column and the content column
  const imgCol = columns.find(el => el.tagName === 'IMG');
  const contentCol = columns.find(el => el !== imgCol);

  // Defensive: ensure both columns exist
  if (!imgCol || !contentCol) return;

  // Use the required block header
  const headerRow = ['Columns (columns1)'];

  // Table columns row: image, then content
  const columnsRow = [imgCol, contentCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
