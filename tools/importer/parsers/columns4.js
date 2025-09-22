/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if we have at least one column
  if (columns.length === 0) return;

  // Header row for columns4 block
  const headerRow = ['Columns (columns4)'];

  // Second row: each cell is a column's content
  // Use the entire column div as the cell content for resilience
  const columnsRow = columns.map((col) => col);

  // Compose the table data
  const tableData = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
