/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element || !document) return;

  // Header row as required
  const headerRow = ['Columns (columns4)'];

  // Get all immediate children (should be the column divs)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, grab its content (in this case, the image inside)
  const contentRow = columnDivs.map(colDiv => {
    // Defensive: check for image
    const img = colDiv.querySelector('img');
    return img ? img : colDiv;
  });

  // Compose the table cells array
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
