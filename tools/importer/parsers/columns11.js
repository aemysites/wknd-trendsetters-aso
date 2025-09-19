/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify left column (text + buttons) and right column (image)
  let leftCol = null;
  let rightCol = null;
  for (const child of gridChildren) {
    if (child.matches('.w-layout-grid.container')) {
      leftCol = child;
    } else if (child.tagName === 'IMG') {
      rightCol = child;
    }
  }
  if (!leftCol || !rightCol) return;

  // Left column: use the .section block if present, else fallback to leftCol
  const leftSection = leftCol.querySelector('.section');
  const leftContent = leftSection || leftCol;

  // Right column: use the image element directly (reference, do not clone)
  const rightContent = rightCol;

  // Table construction: header row and columns row
  const headerRow = ['Columns (columns11)'];
  const columnsRow = [leftContent, rightContent];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
