/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // 2. Identify left (text) and right (image) columns
  let leftCell = null;
  let rightCell = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'IMG') {
      rightCell = child;
    } else {
      leftCell = child;
    }
  });

  // 3. Defensive: If missing, fallback to empty div
  leftCell = leftCell || document.createElement('div');
  rightCell = rightCell || document.createElement('div');

  // 4. Table header must match block name exactly
  const headerRow = ['Columns (columns27)'];
  // 5. Table content row: reference the actual DOM nodes
  const row = [leftCell, rightCell];

  // 6. Create the table (no markdown, only HTML)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // 7. Replace the original element
  element.replaceWith(table);
}
