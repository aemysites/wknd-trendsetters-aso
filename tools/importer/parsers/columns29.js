/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children divs (each is a column)
  const columns = Array.from(element.children)
    .map((colDiv) => {
      // Find the first image inside this column div
      const img = colDiv.querySelector('img');
      // Reference the image element if present, else empty cell
      return img ? img : document.createTextNode('');
    });

  // Build the table: header row, then one row with the images
  const cells = [
    ['Columns (columns29)'], // header row (must match exactly)
    columns                  // content row: images as columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
