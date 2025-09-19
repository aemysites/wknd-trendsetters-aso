/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column is a wrapper div with an image inside
  const columnCells = columns.map(col => {
    // Reference the image element inside this column
    const img = col.querySelector('img');
    // Only reference the image if it exists
    return img ? img : document.createTextNode('');
  });

  // The header row must be a single cell with the block name
  const headerRow = ['Columns (columns6)'];

  // The second row contains as many columns as there are images (or empty if missing)
  const tableRows = [headerRow, columnCells];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
