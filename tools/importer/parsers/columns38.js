/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Block header row
  const headerRow = ['Columns (columns38)'];

  // Content row: each cell is the referenced column div (preserving images and semantics)
  const contentRow = columns.map((col) => col);

  // Table data
  const tableData = [
    headerRow,
    contentRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
