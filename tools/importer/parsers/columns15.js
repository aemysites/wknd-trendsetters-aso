/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by tag name
  function getDirectChildByTag(parent, tagName) {
    return Array.from(parent.children).find(child => child.tagName.toLowerCase() === tagName.toLowerCase());
  }

  // 1. Header row
  const headerRow = ['Columns (columns15)'];

  // 2. Find the main grid layout (2 columns)
  // The grid is: [left column: text/buttons] [right column: image]
  const container = getDirectChildByTag(element, 'DIV');
  if (!container) return;
  const grid = getDirectChildByTag(container, 'DIV');
  if (!grid) return;

  // Find left column (text/buttons) and right column (image)
  // The grid's children: [0]=text column, [1]=image
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // 2nd row: left column (all text/buttons), right column (image)
  const row2 = [leftCol, rightCol];

  // 3. Find navigation bar (bottom row)
  // The nav is the next direct child after the grid
  const nav = Array.from(container.parentElement.children).find(
    el => el.classList && el.classList.contains('nav')
  );
  // Defensive: if not found, fallback to searching in element
  const navEl = nav || Array.from(element.children).find(el => el.classList && el.classList.contains('nav'));
  if (!navEl) return;

  // 3rd row: nav bar spanning both columns
  // To match the visual balance, split nav into left and right sections
  // nav-left (logo/menu), nav-right (subscribe button)
  const navContainer = getDirectChildByTag(navEl, 'DIV');
  if (!navContainer) return;
  const navLeft = navContainer.querySelector('.nav-left');
  const navRight = navContainer.querySelector('.nav-right');
  // Defensive: if not found, fallback to navContainer's children
  const navLeftCell = navLeft || navContainer.children[0];
  const navRightCell = navRight || navContainer.children[navContainer.children.length - 2];

  const row3 = [navLeftCell, navRightCell];

  // Build the table
  const cells = [
    headerRow,
    row2,
    row3
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
