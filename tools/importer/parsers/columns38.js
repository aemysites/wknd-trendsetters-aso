/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns38)'];

  // Defensive: Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each column is a cell in the second row
  // Each column contains an image (possibly with aspect ratio wrappers)
  const row = columns.map(col => {
    // Find the image inside this column
    const img = col.querySelector('img');
    // Only include the image element if it exists
    return img ? img : col;
  });

  // Build the table data
  const cells = [
    headerRow,
    row
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
