/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Columns (columns29)'];

  // Get all direct children (should be two .utility-aspect-1x1 divs)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only process if we have at least one column
  if (columnDivs.length === 0) return;

  // Each column cell will contain the entire .utility-aspect-1x1 div (which contains an image)
  const columnsRow = columnDivs.map((col) => col);

  // Build the table structure
  const tableCells = [
    headerRow,
    columnsRow,
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
