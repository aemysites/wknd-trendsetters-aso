/* global WebImporter */
export default function parse(element, { document }) {
  // Row 1: Block name
  const headerRow = ['Hero (hero12)'];

  // Row 2: Background image (first child div)
  let bgImgCell = '';
  const bgImgDiv = element.querySelector(':scope > div');
  if (bgImgDiv) {
    const bgImg = bgImgDiv.querySelector('img');
    if (bgImg) bgImgCell = bgImg;
  }

  // Row 3: Content (headline, subheading, CTA, etc.)
  let contentCell = '';
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    const grid = cardBody.querySelector('.grid-layout');
    if (grid) {
      const gridChildren = Array.from(grid.children);
      let cellContent = [];
      // First child: image (concert crowd)
      const innerImg = gridChildren.find(child => child.tagName === 'IMG');
      if (innerImg) cellContent.push(innerImg);
      // Second child: text content
      const textDiv = gridChildren.find(child => child.tagName !== 'IMG');
      if (textDiv) {
        // Headline
        const h2 = textDiv.querySelector('h2');
        if (h2) cellContent.push(h2);
        // Subpoints (icon+text rows)
        const flexVertical = textDiv.querySelector('.flex-vertical');
        if (flexVertical) {
          const rows = Array.from(flexVertical.children).filter(
            el => el.classList.contains('flex-horizontal') || el.classList.contains('divider')
          );
          rows.forEach(row => cellContent.push(row));
        }
        // CTA button
        const buttonGroup = textDiv.querySelector('.button-group');
        if (buttonGroup) cellContent.push(buttonGroup);
      }
      contentCell = cellContent;
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
