/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const gridChildren = Array.from(grid.children);

  // Each child is a column: if it's an h2 or div, include its content
  const columnsRow = gridChildren.map((child) => {
    if (child.tagName === 'DIV') {
      // For DIV, include all its element children
      return Array.from(child.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);
    }
    // For other elements (e.g., H2), include as is
    return child;
  });

  // Table header row
  const headerRow = ['Columns (columns7)'];

  // Create table with header and columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
