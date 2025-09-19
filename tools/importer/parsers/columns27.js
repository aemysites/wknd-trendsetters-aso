/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get columns: look for direct children (divs and imgs)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Compose columns content
  const colCells = columns.map((col) => {
    // For images, reference the existing element (do not clone)
    if (col.tagName.toLowerCase() === 'img') return col;
    // For text column, reference the existing element (do not clone)
    if (col.tagName.toLowerCase() === 'div') return col;
    // If unexpected type, create an empty cell
    return document.createElement('div');
  });

  // Table header row: use EXACT block name
  const headerRow = ['Columns (columns27)'];

  // Table body row: columns content
  const bodyRow = colCells;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow
  ], document);

  // Replace original element with the new table
  element.replaceWith(table);
}
