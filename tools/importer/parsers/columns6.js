/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column should contain an image, reference the image element directly
  const images = columns.map(col => {
    const img = col.querySelector('img');
    return img || '';
  });

  // Compose the table: header row, then one row with the images
  const headerRow = ['Columns (columns6)'];
  const contentRow = images;
  const tableData = [headerRow, contentRow];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original grid element with the table
  element.replaceWith(table);
}
