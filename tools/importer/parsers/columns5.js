/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element exists and has children
  if (!element || !element.children || element.children.length === 0) return;

  // Header row for the block
  const headerRow = ['Columns (columns5)'];

  // Get all immediate child divs (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only process if there are columns
  if (columnDivs.length === 0) return;

  // Each column cell contains its inner content (usually an image)
  const columnsRow = columnDivs.map(div => {
    // If the div contains only an image, use the image element directly
    const img = div.querySelector('img');
    if (img) return img;
    // Otherwise, use the div itself
    return div;
  });

  // Build the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
