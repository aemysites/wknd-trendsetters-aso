/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each is a column)
  const columnDivs = element.querySelectorAll(':scope > div');
  // Each column div contains an image
  const images = Array.from(columnDivs)
    .map(div => div.querySelector('img'))
    .filter(img => img); // Only valid images

  // Header row (block name)
  const headerRow = ['Columns (columns5)'];
  // Content row: each image in its own column, referencing the existing DOM element
  const contentRow = images;

  // Build table data
  const tableData = [headerRow, contentRow];
  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
