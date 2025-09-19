/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (should be 3 columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have at least one column
  if (!columns.length) return;

  // Table header row as required
  const headerRow = ['Columns (columns6)'];

  // Second row: each cell is the content of a column
  // In this case, each column contains a single image inside a div
  const contentRow = columns.map(col => {
    // Try to find the image inside the column
    const img = col.querySelector('img');
    if (img) return img;
    // If no image, return the column itself (fallback)
    return col;
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
