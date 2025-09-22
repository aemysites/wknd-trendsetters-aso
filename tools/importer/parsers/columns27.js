/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the column contents)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Expect at least two columns

  // First column: content block (text, heading, button, etc)
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Table header row
  const headerRow = ['Columns (columns27)'];

  // Table content row: each cell is a column
  // Use the entire leftCol and rightCol elements as cell content
  const contentRow = [leftCol, rightCol];

  // Create the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
