/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns5)'];

  // Get all immediate child divs (each is a column cell)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have at least one column
  if (!columns.length) return;

  // Second row: each cell is the content of a column (here, the div itself)
  const columnsRow = columns;

  // Build the table data
  const tableData = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
