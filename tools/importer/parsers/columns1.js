/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns1)'];

  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of grid (should be image and content)
  const gridChildren = Array.from(grid.children);

  // Find image element (first column)
  const imageEl = gridChildren.find((el) => el.tagName === 'IMG');

  // Find content element (second column)
  const contentEl = gridChildren.find((el) => el !== imageEl);

  // Defensive: If missing either, fallback to empty div
  const col1 = imageEl || document.createElement('div');
  const col2 = contentEl || document.createElement('div');

  // Ensure all text and inline elements are preserved in col2
  // No markdown, only HTML elements
  // No hardcoded content

  // Second row: columns side by side
  const columnsRow = [col1, col2];

  // Build table data
  const cells = [headerRow, columnsRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
