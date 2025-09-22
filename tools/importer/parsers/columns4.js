/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const gridChildren = Array.from(grid.children);
  // Defensive: Only proceed if at least 2 columns
  if (gridChildren.length < 2) return;

  // Each column should reference the actual DOM node, not clone or create new
  // This preserves semantic meaning and formatting
  const headerRow = ['Columns (columns4)'];
  const columnsRow = gridChildren.map(col => col); // reference, not clone

  // Create the block table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
