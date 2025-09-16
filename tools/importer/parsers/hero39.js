/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Table header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  let bgImg = null;
  // Find the image inside the first grid cell
  const gridDivs = element.querySelectorAll(':scope > div.w-layout-grid > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: Headline, Paragraph, CTA
  let contentCell = [];
  if (gridDivs.length > 1) {
    const contentGrid = gridDivs[1];
    // Headline
    const h1 = contentGrid.querySelector('h1');
    if (h1) contentCell.push(h1);
    // Paragraph and CTA
    const flexVertical = contentGrid.querySelector('.flex-vertical');
    if (flexVertical) {
      const p = flexVertical.querySelector('p');
      if (p) contentCell.push(p);
      const buttonGroup = flexVertical.querySelector('.button-group');
      if (buttonGroup) {
        const ctaLink = buttonGroup.querySelector('a');
        if (ctaLink) contentCell.push(ctaLink);
      }
    }
  }
  if (contentCell.length === 0) contentCell = [''];
  const contentRow = [contentCell];

  // 4. Build table
  const cells = [headerRow, bgImgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(block);
}
