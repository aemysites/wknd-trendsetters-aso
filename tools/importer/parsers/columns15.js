/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns (headline+content, image)
  const mainContainer = element.querySelector('.container');
  let grid = null;
  if (mainContainer) {
    grid = mainContainer.querySelector('.grid-layout');
  }
  // Fallback: first .grid-layout in the element
  if (!grid) {
    grid = element.querySelector('.grid-layout');
  }

  // Defensive: If grid is not found, fallback to all direct children
  let leftCol = null;
  let rightCol = null;
  if (grid) {
    // The grid should have two children: left (text/buttons), right (image)
    const gridChildren = Array.from(grid.children);
    // Find the first div (left), and the first img (right)
    leftCol = gridChildren.find((child) => child.tagName === 'DIV');
    rightCol = gridChildren.find((child) => child.tagName === 'IMG');
  }
  // Defensive: If not found, fallback to first div and first img in element
  if (!leftCol) {
    leftCol = element.querySelector('div');
  }
  if (!rightCol) {
    rightCol = element.querySelector('img');
  }

  // --- FIX: Extract all content from leftCol, not just the div itself ---
  // This ensures all text content is included.
  let leftColContent = [];
  if (leftCol) {
    leftColContent = Array.from(leftCol.childNodes).filter((node) => {
      // Keep elements and text nodes with non-empty content
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
      return false;
    });
    // If leftColContent is empty, fallback to the leftCol itself
    if (leftColContent.length === 0) leftColContent = [leftCol];
  }

  // The right column is just the image
  const rightColContent = rightCol ? [rightCol] : [];

  // Compose the table rows
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftColContent, rightColContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
