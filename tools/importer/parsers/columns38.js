/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (each column cell)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have at least one column
  if (!columns.length) return;

  // Build the table rows
  const headerRow = ['Columns (columns38)'];
  // Each column cell can be a div containing an image (or more content in other cases)
  const contentRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
