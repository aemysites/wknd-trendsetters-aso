/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container (should be the direct child of element)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Expecting two columns: left (heading), right (paragraph + button)
  // Defensive: Find the heading (h2)
  const heading = gridChildren.find((el) => el.tagName === 'H2');
  // Find the right column container (should be a div)
  const rightCol = gridChildren.find((el) => el.tagName === 'DIV');

  // Defensive: If not found, bail
  if (!heading || !rightCol) return;

  // For the right column, grab all its children
  const rightColChildren = Array.from(rightCol.children);
  // Usually: paragraph + button
  const paragraph = rightColChildren.find((el) => el.tagName === 'P');
  const button = rightColChildren.find((el) => el.tagName === 'A');

  // Compose left and right column content
  const leftCell = heading;
  const rightCell = [];
  if (paragraph) rightCell.push(paragraph);
  if (button) rightCell.push(button);

  // Table header row
  const headerRow = ['Columns (columns7)'];
  // Table content row (2 columns)
  const contentRow = [leftCell, rightCell];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
