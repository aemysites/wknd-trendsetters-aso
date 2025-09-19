/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (contains left text/buttons and right image)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get grid children: left column (text/buttons), right column (image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: collect all content (not just h1, p, button-group)
  const leftCol = gridChildren[0];
  // Collect all direct children (to preserve order and capture all content)
  const leftColContent = Array.from(leftCol.childNodes)
    .filter(node => {
      // Keep element nodes and non-empty text nodes
      return (node.nodeType === Node.ELEMENT_NODE) || (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    })
    .map(node => node.nodeType === Node.ELEMENT_NODE ? node : document.createTextNode(node.textContent));

  // Right column: image (could be an img or a container with an img)
  let rightColContent = [];
  if (gridChildren[1].tagName === 'IMG') {
    rightColContent = [gridChildren[1]];
  } else {
    const img = gridChildren[1].querySelector('img');
    if (img) rightColContent = [img];
  }

  // Table structure
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftColContent, rightColContent];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
