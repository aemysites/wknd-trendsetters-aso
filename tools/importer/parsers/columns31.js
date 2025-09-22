/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return; // If not found, do nothing

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));

  // For each column, collect its content
  // If the column has only one child, use that element, else use all children as an array
  const columnCells = columns.map((col) => {
    // Defensive: get all children
    const children = Array.from(col.childNodes).filter((node) => {
      // Only include elements and non-empty text nodes
      return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
    });
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      return children;
    } else {
      // If empty, just use the column itself
      return col;
    }
  });

  // Build the table rows: header, then columns
  const rows = [headerRow, columnCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
