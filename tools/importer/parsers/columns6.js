/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Block header row as required
  const headerRow = ['Columns (columns6)'];

  // Each column contains a single image (reference the existing image element)
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    return img || '';
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
