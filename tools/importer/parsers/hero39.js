/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Find background image (must reference the actual <img> element)
  const imageDiv = gridChildren.find(div => div.querySelector('img'));
  let backgroundImg = null;
  if (imageDiv) {
    backgroundImg = imageDiv.querySelector('img');
  }

  // Find text content (headline, paragraph, CTA)
  const textDiv = gridChildren.find(div => div.classList.contains('container'));
  let contentElements = [];
  if (textDiv) {
    const innerGrid = textDiv.querySelector('.grid-layout');
    if (innerGrid) {
      // Headline
      const h1 = innerGrid.querySelector('h1');
      if (h1) contentElements.push(h1);
      // Subheading and CTA
      const flexVertical = innerGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        const p = flexVertical.querySelector('p');
        if (p) contentElements.push(p);
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          Array.from(buttonGroup.children).forEach(btn => contentElements.push(btn));
        }
      }
    }
  }

  // Table header must match block name exactly
  const headerRow = ['Hero (hero39)'];
  // Second row: background image element (or empty string)
  const imageRow = [backgroundImg ? backgroundImg : ''];
  // Third row: content elements (or empty string)
  const contentRow = [contentElements.length ? contentElements : ''];

  // Create table
  const table = WebImporter.DOMUtils.createTable([headerRow, imageRow, contentRow], document);
  element.replaceWith(table);
}
