/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get the main grid containing both columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the left column (text + buttons)
  let leftCol = null;
  let rightColImg = null;

  const gridChildren = Array.from(grid.children);
  // Find the container grid (left column)
  leftCol = gridChildren.find(child => child.classList.contains('container'));
  // Find the image (right column)
  rightColImg = gridChildren.find(child => child.tagName === 'IMG');

  // Defensive: If either column is missing, abort
  if (!leftCol || !rightColImg) return;

  // Left column: get all content (heading, paragraph, buttons)
  // We use the entire leftCol div for resilience
  // But we could also extract individual elements if needed
  // For now, reference the whole leftCol

  // Right column: reference the image element directly

  // Build table rows
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftCol, rightColImg];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
