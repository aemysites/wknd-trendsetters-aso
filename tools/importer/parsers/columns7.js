/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns block)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Prepare header row with a single column
  const headerRow = ['Columns (columns7)'];

  // Prepare columns row: one cell for each column
  const columnsRow = columns.map(col => {
    // Remove unnecessary attributes from column elements
    const clone = col.cloneNode(true);
    clone.removeAttribute('id');
    clone.removeAttribute('class');
    clone.removeAttribute('data-hlx-imp-color');
    return clone;
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
