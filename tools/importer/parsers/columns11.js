/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (the direct child of the section)
  const grid = element.querySelector(':scope > div');
  if (!grid) return;

  // Get all direct children of the grid (should be two: content and image)
  const gridChildren = Array.from(grid.children);

  // Find the content column (should be a div with heading, paragraph, buttons)
  let contentCol = null;
  let imageCol = null;

  // The content column is a grid itself, image is an <img>
  gridChildren.forEach(child => {
    if (child.tagName === 'DIV') {
      contentCol = child;
    } else if (child.tagName === 'IMG') {
      imageCol = child;
    }
  });

  // Defensive fallback: if not found, try to find them
  if (!contentCol) {
    contentCol = grid.querySelector('div');
  }
  if (!imageCol) {
    imageCol = grid.querySelector('img');
  }

  // Build the table rows
  const headerRow = ['Columns (columns11)'];
  const columnsRow = [contentCol, imageCol].filter(Boolean);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
