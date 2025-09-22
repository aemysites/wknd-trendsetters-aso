/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image element (reference, not clone)
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    return img || '';
  });

  // Build the table data: header row and content row
  const headerRow = ['Columns (columns38)'];
  const tableData = [headerRow, contentRow];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
