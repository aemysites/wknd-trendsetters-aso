/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Block header row
  const headerRow = ['Columns (columns38)'];

  // Content row: each column is a cell containing the referenced image element
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the image element directly if present
    if (img) return img;
    // Fallback: if no image, reference the column itself
    return col;
  });

  // Build table data
  const tableData = [headerRow, contentRow];

  // Create the columns block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
