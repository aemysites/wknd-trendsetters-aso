/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container (holds columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only keep columns that have actual content
  const filteredColumns = columns.filter(col => col && col.childNodes.length > 0);

  // Build the header row
  const headerRow = ['Columns (columns9)'];

  // Build the columns row: each cell is the full column element
  const columnsRow = filteredColumns.map(col => col);

  // Table structure: header row, then columns row
  const tableCells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
