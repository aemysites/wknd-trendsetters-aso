/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only include columns that contain an image
  const cells = children.map((col) => {
    const img = col.querySelector('img');
    // Always reference the actual image element, not clone or URL
    return img || col;
  });

  // Table header row: block name exactly as required
  const headerRow = ['Columns (columns5)'];
  // Second row: one cell per column, each with its image element
  const columnsRow = cells;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
