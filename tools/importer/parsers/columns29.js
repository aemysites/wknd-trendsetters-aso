/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Columns (columns29)'];

  // Get all direct children of the grid (should be 2 divs, each with an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: only proceed if we have at least one column
  if (!columnDivs.length) return;

  // For each column, extract the image (if present)
  const columns = columnDivs.map(colDiv => {
    // Find the first image inside this column div
    const img = colDiv.querySelector('img');
    // If found, return the image element
    if (img) return img;
    // If not, return the entire column div as fallback
    return colDiv;
  });

  // Build the table rows
  const tableRows = [
    headerRow,
    columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
