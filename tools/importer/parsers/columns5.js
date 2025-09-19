/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate child divs (each contains an image)
  const columnDivs = element.querySelectorAll(':scope > div');

  // Defensive: Only proceed if we have at least one column
  if (!columnDivs.length) return;

  // Header row as required
  const headerRow = ['Columns (columns5)'];

  // Second row: each cell is the image div (contains the image)
  const imageRow = Array.from(columnDivs);

  // Build the table
  const cells = [headerRow, imageRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
