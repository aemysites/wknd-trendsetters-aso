/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // The block header row
  const headerRow = ['Columns (columns5)'];

  // The second row: each column gets one image div (which contains an image)
  // If the div contains only an image, just use the div itself for resilience
  const columnsRow = columnDivs.map(div => div);

  // Build the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
