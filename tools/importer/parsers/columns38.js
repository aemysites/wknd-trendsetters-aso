/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is present
  if (!element || !document) return;

  // Header row as per block guidelines
  const headerRow = ['Columns (columns38)'];

  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, try to find the main content (image or text)
  // In this case, each column contains a single image
  const contentRow = columns.map((col) => {
    // Try to find the main image in the column
    const img = col.querySelector('img');
    if (img) return img;
    // If no image, fallback to the column itself
    return col;
  });

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
