/* global WebImporter */
export default function parse(element, { document }) {
  // Row 1: Block name
  const headerRow = ['Hero (hero12)'];

  // Row 2: Background image (optional)
  let backgroundImg = '';
  // Find the first direct child div, then its img
  const grid = element.querySelector('.grid-layout.desktop-1-column');
  if (grid) {
    const firstDiv = grid.querySelector(':scope > div');
    if (firstDiv) {
      const bgImg = firstDiv.querySelector('img');
      if (bgImg) backgroundImg = bgImg;
    }
  }
  const backgroundRow = [backgroundImg];

  // Row 3: Title, subheading, CTA, etc.
  let contentCell = document.createElement('div');
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // Find the text container inside the grid (skip the image)
    const innerGrid = cardBody.querySelector('.grid-layout');
    if (innerGrid) {
      const children = Array.from(innerGrid.children);
      for (const child of children) {
        if (child.tagName !== 'IMG') {
          // Collect all relevant content inside text container
          Array.from(child.childNodes).forEach(node => {
            contentCell.appendChild(node.cloneNode(true));
          });
        }
      }
    }
  }
  // If no content was added, fallback to ''
  if (!contentCell.hasChildNodes()) contentCell = '';

  const cells = [
    headerRow,
    backgroundRow,
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
