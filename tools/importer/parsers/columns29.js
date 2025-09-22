/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns29)'];

  // Get all immediate children (should be the column wrappers)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have columns
  if (!columns.length) return;

  // For each column, find the main image (if present)
  const cells = columns.map((col) => {
    // Try to find the image inside this column
    const img = col.querySelector('img');
    // Only include the image element if it exists
    if (img) return img;
    // If no image, include the whole column
    return col;
  });

  // Build the table rows: header, then one row with all columns
  const tableRows = [
    headerRow,
    cells
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
