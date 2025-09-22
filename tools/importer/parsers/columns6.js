/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column is an image inside its own div
  const cellsRow = columnDivs.map(div => {
    // Find the image inside the div
    const img = div.querySelector('img');
    // Reference the image element directly if it exists
    return img ? img : '';
  });

  // Table rows: header, then one row with all images as columns
  const rows = [
    ['Columns (columns6)'],
    cellsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
