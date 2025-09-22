/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (the two-column hero)
  const container = element.querySelector('.container');
  let grid = null;
  if (container) {
    grid = container.querySelector('.grid-layout');
  }
  if (!grid) grid = container || element;

  // The grid has two direct children: a div (left) and an img (right)
  let leftCol = null;
  let rightCol = null;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length >= 2) {
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  }

  // Instead of just grabbing the leftCol and rightCol elements, extract their full content blocks
  function extractContent(node) {
    // If node is null, return empty string
    if (!node) return '';
    // If node is an image, return the image element
    if (node.tagName === 'IMG') return node;
    // Otherwise, collect all children as a fragment
    const frag = document.createDocumentFragment();
    Array.from(node.childNodes).forEach(child => {
      frag.appendChild(child.cloneNode(true));
    });
    return frag;
  }

  // Compose the table rows
  const headerRow = ['Columns (columns15)'];
  const secondRow = [extractContent(leftCol), extractContent(rightCol)];
  const rows = [headerRow, secondRow];

  // Build the table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
