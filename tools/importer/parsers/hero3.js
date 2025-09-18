/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row (row 2)
  // Find the background image: it's the <img> inside the first grid cell
  let bgImg = null;
  const gridLayout = element.querySelector('.w-layout-grid');
  let gridDivs = [];
  if (gridLayout) {
    gridDivs = Array.from(gridLayout.children);
  }
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) bgImg = img;
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (row 3)
  // Find the card with heading, subheading, and buttons
  let contentCell = [];
  if (gridDivs.length > 1) {
    // The second grid cell contains the content
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      // Extract heading, subheading, and button group
      const h1 = card.querySelector('h1');
      if (h1) contentCell.push(h1);
      const subheading = card.querySelector('p.subheading');
      if (subheading) contentCell.push(subheading);
      const buttonGroup = card.querySelector('.button-group');
      if (buttonGroup) {
        // Only include actual links/buttons
        const buttons = Array.from(buttonGroup.querySelectorAll('a'));
        if (buttons.length > 0) {
          contentCell = contentCell.concat(buttons);
        }
      }
    }
  }
  const contentRow = [contentCell.length > 0 ? contentCell : ''];

  // Assemble the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
