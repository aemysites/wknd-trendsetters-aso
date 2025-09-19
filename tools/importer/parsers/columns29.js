/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate child divs (each is a column)
  const columnDivs = element.querySelectorAll(':scope > div');

  // Each column div contains an image (possibly with aspect ratio wrappers)
  // We'll extract the first img from each div
  const columns = Array.from(columnDivs).map((colDiv) => {
    const img = colDiv.querySelector('img');
    // Defensive: Only include if image exists
    return img ? img : '';
  });

  // Table structure: header row, then columns row
  const headerRow = ['Columns (columns29)'];
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
