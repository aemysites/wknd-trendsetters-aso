/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid layout (first child of section)
  const grid = element.querySelector(':scope > div');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // There are two main columns: left (text/buttons), right (image)
  // Find the left content (the nested grid)
  let leftContent = null;
  let rightImage = null;

  // The left content is a div with a grid class and contains the text/buttons
  for (const child of gridChildren) {
    if (
      child.tagName === 'DIV' &&
      child.classList.contains('w-layout-grid') &&
      child.querySelector('h2')
    ) {
      leftContent = child;
    } else if (child.tagName === 'IMG') {
      rightImage = child;
    }
  }

  // Defensive: if not found, fallback to first/last child
  if (!leftContent && gridChildren.length > 0) leftContent = gridChildren[0];
  if (!rightImage && gridChildren.length > 1) rightImage = gridChildren[1];

  // Compose the table rows
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftContent, rightImage];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
