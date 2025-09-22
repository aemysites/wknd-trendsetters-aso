/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and has children
  if (!element || !element.querySelectorAll) return;

  // Get all direct children (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (!columnDivs.length) return;

  // Header row: block name as required
  const headerRow = ['Columns (columns5)'];

  // Second row: each cell is the content of a column
  // For each column div, extract its content (usually an image)
  const columnsRow = columnDivs.map((colDiv) => {
    // If the column contains only one child, just use that element
    if (colDiv.children.length === 1) {
      return colDiv.firstElementChild;
    }
    // If multiple children, return an array of them
    return Array.from(colDiv.childNodes);
  });

  // Build the table rows array
  const rows = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
