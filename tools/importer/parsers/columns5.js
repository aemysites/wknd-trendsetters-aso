/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and has children
  if (!element || !element.children || element.children.length === 0) return;

  // Get all immediate children (should be 5 divs, each with an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (columnDivs.length === 0) return;

  // Each column cell should contain the image inside the child div
  const columnCells = columnDivs.map((colDiv) => {
    // Try to find the image inside the div
    const img = colDiv.querySelector('img');
    if (img) {
      return img;
    }
    // If no image, fallback to the div itself
    return colDiv;
  });

  // Build the table rows
  const headerRow = ['Columns (columns5)'];
  const columnsRow = columnCells;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
