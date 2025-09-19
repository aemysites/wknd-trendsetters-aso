/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container (holds columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of grid (should be 2 columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: left content block (text, button)
  const leftCol = columns[0];
  // Second column: right content block (image)
  const rightCol = columns[1];

  // Build left column cell content
  // Collect all children of leftCol
  const leftColContent = Array.from(leftCol.childNodes).filter((node) => {
    // Only keep elements and non-empty text nodes
    return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
  });

  // Build right column cell content
  // The right column is just the image element
  const rightColContent = [rightCol];

  // Table header row (block name)
  const headerRow = ['Columns (columns27)'];
  // Table content row: two columns
  const contentRow = [leftColContent, rightColContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element with new table
  element.replaceWith(table);
}
