/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns (columns31)'];

  // Find the grid-layout container (should be the first child of the outer container)
  const grid = element.querySelector(':scope > .grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid, each is a column
    const colEls = Array.from(grid.children);
    // Defensive: Only include non-empty columns
    columns = colEls.map((col) => {
      // If the column has only one child, just use that child
      if (col.children.length === 1) {
        return col.firstElementChild;
      }
      // Otherwise, return the column as-is
      return col;
    });
  }

  // If no grid found, fallback: treat all direct children as columns
  if (columns.length === 0) {
    columns = Array.from(element.children);
  }

  // Build the table rows
  const tableRows = [headerRow];
  tableRows.push(columns);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
