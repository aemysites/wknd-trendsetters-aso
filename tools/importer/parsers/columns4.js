/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));

  // Prepare the header row as specified
  const headerRow = ['Columns (columns4)'];

  // Build the second row: each cell is one column's content (reference, not clone)
  const contentRow = columns.map((col) => col);

  // Compose the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
