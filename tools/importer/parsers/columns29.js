/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate children (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column contains an image inside a div.utility-aspect-1x1
  // We'll extract the image from each column
  const images = columns.map(col => {
    // Find the first img inside this column
    const img = col.querySelector('img');
    return img ? img : null;
  }).filter(Boolean); // Remove nulls if any

  // Build the table rows
  const headerRow = ['Columns (columns29)'];
  // Second row: each image in its own column
  const contentRow = images;

  // Compose the table data
  const tableData = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
