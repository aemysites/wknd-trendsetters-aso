/* global WebImporter */
export default function parse(element, { document }) {
  // --- Row 1: Block Name ---
  const headerRow = ['Hero (hero12)'];

  // --- Row 2: Background Image (optional) ---
  let bgImg = '';
  const topDivs = element.querySelectorAll(':scope > div');
  if (topDivs.length > 0) {
    const img = topDivs[0].querySelector('img.cover-image.utility-position-absolute');
    if (img) bgImg = img;
  }
  const bgImgRow = [bgImg];

  // --- Row 3: Content (title, subheading, cta) ---
  let contentCell = null;
  if (topDivs.length > 1) {
    const cardBody = topDivs[1].querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        const gridChildren = Array.from(grid.children);
        let cellDiv = document.createElement('div');
        let hasContent = false;
        gridChildren.forEach(child => {
          // Only process the text block (not the image)
          if (child.tagName !== 'IMG') {
            Array.from(child.childNodes).forEach(node => {
              if (
                (node.nodeType === Node.ELEMENT_NODE && (node.tagName.match(/^H[1-6]$/) || node.tagName === 'P' || node.tagName === 'DIV' || node.tagName === 'A')) ||
                (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
              ) {
                cellDiv.appendChild(node.cloneNode(true));
                hasContent = true;
              }
            });
          }
        });
        if (hasContent) contentCell = cellDiv;
      }
    }
  }
  // Only include the third row if there is content
  const cells = [headerRow, bgImgRow];
  if (contentCell) {
    cells.push([contentCell]);
  }
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
