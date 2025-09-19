/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header row (block name)
  const headerRow = ['Columns (columns38)'];

  // Table content row: each column gets its own cell
  // Each column div contains one image
  const contentRow = columns.map(col => {
    // Reference the image element inside the column
    const img = col.querySelector('img');
    return img ? img : document.createTextNode(''); // If no image, empty cell
  });

  // Compose the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
