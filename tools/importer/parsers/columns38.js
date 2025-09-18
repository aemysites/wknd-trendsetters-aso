/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row as per block spec
  const headerRow = ['Columns (columns38)'];

  // Get all immediate children (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column cell should contain the entire column div (image inside)
  const contentRow = columns;

  // Build the table data
  const tableData = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
