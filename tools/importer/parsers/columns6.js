/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (should be 3 columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have columns
  if (!columns.length) return;

  // Table header row
  const headerRow = ['Columns (columns6)'];

  // Table content row: one cell per column, each containing the image
  const contentRow = columns.map(col => {
    // Each col is a div.utility-aspect-1x1 containing an img
    // We want to reference the whole div so that any aspect/image styling is preserved
    return col;
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
