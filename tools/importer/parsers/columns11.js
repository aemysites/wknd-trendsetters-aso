/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Helper to extract all text and inline elements from a node
  function extractContent(nodes) {
    const frag = document.createDocumentFragment();
    nodes.forEach(node => {
      if (node) frag.appendChild(node.cloneNode(true));
    });
    return frag;
  }

  // 1. HEADER ROW
  const headerRow = ['Columns (columns11)'];

  // 2. FIRST ROW (two columns: left = heading, right = intro + author + button)
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const gridChildren = Array.from(mainGrid.children);
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // LEFT COLUMN: eyebrow + h1
  let leftColNodes = [];
  if (leftCol) {
    const eyebrow = leftCol.querySelector('.eyebrow');
    const h1 = leftCol.querySelector('h1');
    if (eyebrow) leftColNodes.push(eyebrow);
    if (h1) leftColNodes.push(h1);
  }

  // RIGHT COLUMN: intro paragraph, author info, button
  let rightColNodes = [];
  if (rightCol) {
    const intro = rightCol.querySelector('.rich-text');
    if (intro) rightColNodes.push(intro);
    const authorGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
    if (authorGrid) {
      const authorInfo = authorGrid.children[0];
      if (authorInfo) rightColNodes.push(authorInfo);
      const button = authorGrid.querySelector('a.button');
      if (button) rightColNodes.push(button);
    }
  }

  // 3. SECOND ROW (two columns: images)
  const imageGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imageCells = [];
  if (imageGrid) {
    const imageDivs = Array.from(imageGrid.children);
    imageCells = imageDivs.map(div => {
      const img = div.querySelector('img');
      return img ? img : '';
    });
  }

  // Build table rows
  const rows = [
    headerRow,
    [extractContent(leftColNodes), extractContent(rightColNodes)],
    imageCells
  ];

  // Remove any empty row at the end if present
  while (rows.length > 0 && rows[rows.length - 1].every(cell => {
    if (typeof cell === 'string') return cell.trim() === '';
    if (cell instanceof DocumentFragment) return cell.childNodes.length === 0;
    if (cell instanceof HTMLElement && cell.tagName === 'IMG') return false;
    return false;
  })) {
    rows.pop();
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
