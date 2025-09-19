/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level grid containing both columns
  const topGrid = element.querySelector(':scope > .w-layout-grid');
  if (!topGrid) return;

  // Find the left column: contains heading, paragraph, buttons
  let leftCol = null;
  const leftGrid = topGrid.querySelector('.container');
  if (leftGrid && leftGrid.children.length > 0) {
    leftCol = leftGrid.children[0]; // section with heading, text, buttons
  }

  // Find the right column: image (direct child of topGrid)
  let rightCol = null;
  for (const child of topGrid.children) {
    if (child.tagName === 'IMG') {
      rightCol = child;
      break;
    }
  }

  // Defensive: If either column is missing, fallback to empty cell
  const headerRow = ['Columns (columns11)'];
  const columnsRow = [leftCol || '', rightCol || ''];

  // Use references to existing elements, not clones
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
