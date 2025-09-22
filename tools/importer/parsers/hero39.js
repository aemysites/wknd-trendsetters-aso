/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background Image row
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row (Title, Subheading, CTA)
  let contentCell = document.createElement('div');
  if (gridDivs.length > 1) {
    // The second grid cell contains headings, paragraph, and button
    const innerGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (innerGrid) {
      // Heading
      const h1 = innerGrid.querySelector('h1');
      if (h1) contentCell.appendChild(h1);
      // Paragraph and button
      const flexVertical = innerGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        // Paragraph
        const para = flexVertical.querySelector('p');
        if (para) contentCell.appendChild(para);
        // Button (CTA)
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          const cta = buttonGroup.querySelector('a');
          if (cta) contentCell.appendChild(cta);
        }
      }
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
