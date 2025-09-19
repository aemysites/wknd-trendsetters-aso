/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate child divs (each column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column div contains an image
  const columns = columnDivs.map((colDiv) => {
    // Find the first image inside this column div
    const img = colDiv.querySelector('img');
    // Only include the image if it exists
    return img ? img : '';
  });

  // Build the table rows
  const headerRow = ['Columns (columns29)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
