/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Ensure all content is included dynamically
  // First column: image
  const imageCol = columns[0];
  // Second column: text content
  const textCol = columns[1];

  // Table header must match block name exactly
  const headerRow = ['Columns (columns1)'];

  // Table content row: each column as a cell
  const contentRow = [imageCol, textCol];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
