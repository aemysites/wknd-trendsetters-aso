/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and has children
  if (!element || !element.children || element.children.length === 0) return;

  // Block header row
  const headerRow = ['Columns (columns29)'];

  // Get all immediate children of the grid (each is a column wrapper)
  const columnDivs = element.querySelectorAll(':scope > div');
  if (columnDivs.length === 0) return;

  // For this block, each immediate child div is a column cell
  // Each column div contains an image inside .utility-aspect-1x1
  const columns = Array.from(columnDivs).map((colDiv) => {
    // Defensive: Find the image inside this column
    const img = colDiv.querySelector('img');
    return img ? img : '';
  });

  // Build the table: header row, then one row with all columns
  const rows = [headerRow, columns];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
