/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (should be 3 divs, each with an img)
  const children = Array.from(element.querySelectorAll(':scope > div'));
  // Each child is a .utility-aspect-1x1 div containing an img
  const columns = children.map((colDiv) => {
    // Find the first image inside this column
    const img = colDiv.querySelector('img');
    // Only include if image exists, reference the actual element
    return img || '';
  });

  // Build the table rows
  const headerRow = ['Columns (columns6)'];
  const columnsRow = columns;
  const tableRows = [headerRow, columnsRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
