/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each containing an image)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if at least one column exists
  if (!columns.length) return;

  // Build the table rows
  const headerRow = ['Columns (columns38)'];
  // Each column cell contains the entire div (which contains the image)
  const columnsRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
