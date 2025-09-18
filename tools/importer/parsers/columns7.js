/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of a node
  function getDirectChildrenByTag(parent, tagName) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tagName.toLowerCase());
  }

  // 1. Header row (block name)
  const headerRow = ['Columns (columns7)'];

  // 2. Find the grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return; // Defensive: if grid not found, do nothing

  // 3. Get direct children of grid
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns (left: h2, right: content)
  // Left column: h2
  const leftCol = gridChildren.find(child => child.tagName === 'H2');
  // Right column: div (contains paragraph and button)
  const rightCol = gridChildren.find(child => child.tagName === 'DIV');

  // Defensive: If either column missing, fallback to all grid children
  let columns;
  if (leftCol && rightCol) {
    columns = [leftCol, rightCol];
  } else {
    columns = gridChildren;
  }

  // 4. Build the columns row
  // For the right column, include all its children (paragraph + button)
  const rightColContent = rightCol ? Array.from(rightCol.children) : [];
  const row = [leftCol, rightColContent];

  // 5. Build table cells array
  const cells = [headerRow, row];

  // 6. Create table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 7. Replace original element
  element.replaceWith(table);
}
