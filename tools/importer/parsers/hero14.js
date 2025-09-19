/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  const getImmediateChild = (parent, selector) => {
    return Array.from(parent.children).find((el) => el.matches(selector));
  };

  // 1. Header row
  const headerRow = ['Hero (hero14)'];

  // 2. Background image row
  // Find the grid-layout div
  const gridDiv = element.querySelector('.w-layout-grid');
  let bgImg = null;
  if (gridDiv) {
    // The background image is in the first child div > div > img
    const firstGridChild = gridDiv.children[0];
    if (firstGridChild) {
      const parallaxDiv = getImmediateChild(firstGridChild, 'div');
      if (parallaxDiv) {
        bgImg = parallaxDiv.querySelector('img');
      }
    }
  }
  const backgroundRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  // The content is in the second grid child
  let contentCell = '';
  if (gridDiv && gridDiv.children.length > 1) {
    const contentDiv = gridDiv.children[1];
    // The heading and button group are inside contentDiv
    // We'll include the heading and any button group (even if empty)
    const contentParts = [];
    // Heading
    const headingWrap = contentDiv.querySelector('.utility-margin-bottom-6rem');
    if (headingWrap) {
      // h1
      const h1 = headingWrap.querySelector('h1');
      if (h1) contentParts.push(h1);
      // Button group (CTA)
      const buttonGroup = headingWrap.querySelector('.button-group');
      if (buttonGroup && buttonGroup.children.length > 0) {
        contentParts.push(buttonGroup);
      }
    }
    if (contentParts.length > 0) {
      contentCell = contentParts;
    }
  }
  const contentRow = [contentCell];

  // Assemble table
  const tableCells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
