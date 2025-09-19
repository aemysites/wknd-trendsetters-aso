/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (contains left text/buttons and right image)
  const grid = element.querySelector('.grid-layout');
  let leftCol = null;
  let rightCol = null;

  if (grid) {
    // The grid has two direct children: leftCol (div), rightCol (img)
    const gridChildren = Array.from(grid.children);
    leftCol = gridChildren.find(el => el.tagName.toLowerCase() === 'div');
    rightCol = gridChildren.find(el => el.tagName.toLowerCase() === 'img');
  }

  // Defensive: fallback if structure changes
  if (!leftCol || !rightCol) {
    const headerRow = ['Columns (columns15)'];
    const contentRow = [element.cloneNode(true)];
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      contentRow,
    ], document);
    element.replaceWith(table);
    return;
  }

  // Compose left cell: include ALL content (not just direct children)
  // This ensures we capture all text, including nested elements
  const leftCellContent = [leftCol.cloneNode(true)];

  // Compose right cell: image
  const rightCellContent = [rightCol.cloneNode(true)];

  // Build the table
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
