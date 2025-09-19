/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate child divs (each column cell)
  const cells = [];
  const headerRow = ['Columns (columns6)'];

  // Get all direct children divs (each is a column)
  const columnDivs = element.querySelectorAll(':scope > div');

  // For this block, each column is a cell in the second row
  const columns = Array.from(columnDivs).map((div) => {
    // If the div contains only an image, use the image element directly
    const img = div.querySelector('img');
    if (img && div.children.length === 1 && div.children[0] === img) {
      return img;
    }
    // Otherwise, use the whole div (for future-proofing, but not needed here)
    return div;
  });

  // Build the table rows
  cells.push(headerRow);
  cells.push(columns);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
