/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Find the main grid layout for columns
  const container = element.querySelector('.container');
  let grid = null;
  if (container) {
    grid = container.querySelector('.grid-layout');
  }

  // Defensive: fallback to searching for grid-layout anywhere
  if (!grid) {
    grid = element.querySelector('.grid-layout');
  }

  // Get left column (text/buttons) and right column (image)
  let leftCol = null;
  let rightCol = null;
  if (grid) {
    const gridChildren = getDirectChildren(grid, 'div, img');
    // Usually: [div (text/buttons), img]
    leftCol = gridChildren.find((el) => el.tagName === 'DIV');
    rightCol = gridChildren.find((el) => el.tagName === 'IMG');
  }

  // Defensive fallback: if not found, try to get first div and first img in grid
  if (!leftCol && grid) {
    leftCol = grid.querySelector('div');
  }
  if (!rightCol && grid) {
    rightCol = grid.querySelector('img');
  }

  // Compose first content row: leftCol and rightCol
  // Defensive: only include if found
  const firstContentRow = [];
  if (leftCol) {
    // Instead of just the div, collect all its children for more flexible parsing
    const leftColContent = Array.from(leftCol.childNodes).filter(
      node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
    );
    // If no children, fallback to the div itself
    if (leftColContent.length > 0) {
      firstContentRow.push(leftColContent);
    } else {
      firstContentRow.push(leftCol);
    }
  }
  if (rightCol) firstContentRow.push(rightCol);

  // Compose second content row: nav bar (if present)
  // The nav bar is outside the grid, but inside the header
  const nav = element.querySelector('.nav.secondary-nav');
  let navRow = null;
  if (nav) {
    navRow = [nav];
  }

  // Build the table rows
  const headerRow = ['Columns (columns15)'];
  const rows = [headerRow];
  if (firstContentRow.length > 0) {
    rows.push(firstContentRow);
  }
  if (navRow) {
    // Ensure navRow has same number of columns as firstContentRow, but do NOT pad with empty columns
    // Only add navRow if it has the same number of columns as the first content row
    if (firstContentRow.length === navRow.length) {
      rows.push(navRow);
    }
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
