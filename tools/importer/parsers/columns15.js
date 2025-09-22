/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (the two columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let leftContent = [];
  let rightContent = [];

  if (grid) {
    // Left column: all content except images
    const leftCol = Array.from(grid.children).find(el => el.tagName.toLowerCase() === 'div');
    if (leftCol) {
      // Instead of picking specific tags, grab all direct children (to ensure all text content is included)
      leftContent = Array.from(leftCol.childNodes).filter(node => {
        // Include elements and text nodes with non-empty text
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      }).map(node => {
        // If text node, wrap in <span> for table cell
        if (node.nodeType === 3) {
          const span = document.createElement('span');
          span.textContent = node.textContent;
          return span;
        }
        return node;
      });
    }
    // Right column: all images in grid
    rightContent = Array.from(grid.children).filter(el => el.tagName.toLowerCase() === 'img');
  }

  // Defensive fallback: if grid not found, use all children
  if (leftContent.length === 0 && rightContent.length === 0) {
    leftContent = Array.from(element.childNodes).filter(node => {
      return (node.nodeType === 1 && node.tagName.toLowerCase() !== 'img') || (node.nodeType === 3 && node.textContent.trim());
    }).map(node => {
      if (node.nodeType === 3) {
        const span = document.createElement('span');
        span.textContent = node.textContent;
        return span;
      }
      return node;
    });
    rightContent = Array.from(element.querySelectorAll('img'));
  }

  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
