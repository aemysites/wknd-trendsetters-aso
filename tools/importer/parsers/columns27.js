/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: left side (text content)
  const leftCol = columns[0];
  // Second column: right side (image)
  const rightCol = columns[1];

  // Gather all content from the left column
  const leftContent = Array.from(leftCol.childNodes).filter(node => {
    // Only include elements and text nodes with non-whitespace
    return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
  });

  // For the right column, reference the image element if present
  let rightContent = null;
  if (rightCol.tagName === 'IMG') {
    rightContent = rightCol;
  } else {
    // Defensive: if not an image, include all children
    rightContent = Array.from(rightCol.childNodes).filter(node => {
      return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
    });
  }

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns27)'];
  // Table row: two columns, left and right
  const contentRow = [leftContent, rightContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
