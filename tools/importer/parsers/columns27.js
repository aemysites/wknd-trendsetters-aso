/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Columns (columns27)'];

  // Defensive: Find the grid columns (should be two for this block)
  // The grid is the direct child of .container
  const grid = element.querySelector('.grid-layout');
  let leftCol, rightCol;
  if (grid) {
    // Find all direct children of the grid
    const gridChildren = Array.from(grid.children);
    // The left column is the first div, the right column is the image
    leftCol = gridChildren.find((el) => el.tagName === 'DIV');
    rightCol = gridChildren.find((el) => el.tagName === 'IMG');
  }

  // Defensive fallback: if not found, treat all children as columns
  if (!leftCol || !rightCol) {
    const gridChildren = Array.from(element.querySelectorAll('.grid-layout > *'));
    leftCol = gridChildren[0] || document.createElement('div');
    rightCol = gridChildren[1] || document.createElement('div');
  }

  // Compose the columns row
  const columnsRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
