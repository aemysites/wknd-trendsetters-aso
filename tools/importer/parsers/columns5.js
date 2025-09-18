/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as per block requirements
  const headerRow = ['Columns (columns5)'];

  // Get all immediate child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: skip if no columns found
  if (!columnDivs.length) return;

  // Each column cell contains the entire div (with its image)
  const columnsRow = columnDivs.map(div => div);

  // Table structure: header, then columns
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
