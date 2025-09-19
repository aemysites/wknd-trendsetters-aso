/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the heading (column 1)
  const heading = gridChildren.find((el) => el.tagName === 'H2');
  // Find the content block (column 2)
  const contentBlock = gridChildren.find((el) => el.tagName !== 'H2');

  // Defensive: If missing, fallback to all children
  const col1 = heading || gridChildren[0];
  const col2 = contentBlock || gridChildren[1];

  // Table header: must be exactly one column
  const headerRow = ['Columns (columns7)'];

  // Table columns: visually, this is a 2-column layout
  const columnsRow = [col1, col2];

  // Build table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
