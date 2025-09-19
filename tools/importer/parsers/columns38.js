/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // Header row as specified
  const headerRow = ['Columns (columns38)'];

  // Second row: each cell is the content of a column div
  // Each column div may contain an image or other content
  const contentRow = columns.map(col => {
    // If the column contains only one child, use that element directly
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, return the column div itself (rare for this block)
    return col;
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
