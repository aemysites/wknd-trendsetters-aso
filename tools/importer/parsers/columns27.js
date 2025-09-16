/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the actual columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Prepare cells for the second row
  const secondRowCells = columns.map((col) => {
    // If it's an image, use the image element directly
    if (col.tagName === 'IMG') {
      return col;
    }
    // Otherwise, it's the content column: include the whole div
    return col;
  });

  // Table header must match the target block name exactly
  const headerRow = ['Columns (columns27)'];
  // Table rows: header, then columns as cells
  const cells = [headerRow, secondRowCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
