/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: check for at least two columns
  if (gridChildren.length < 2) return;

  // First column: heading (h2)
  const heading = gridChildren[0];

  // Second column: right content (div with paragraph and button)
  const rightCol = gridChildren[1];
  const rightColContent = [];
  Array.from(rightCol.childNodes).forEach((node) => {
    // Only include elements and text nodes with content
    if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      rightColContent.push(node);
    }
  });

  // Table header
  const headerRow = ['Columns (columns7)'];
  // Table content row: two columns, heading and right column
  const contentRow = [heading, rightColContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
