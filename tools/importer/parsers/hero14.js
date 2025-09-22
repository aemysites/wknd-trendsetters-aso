/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by tag name
  function getDirectChildByTag(parent, tag) {
    return Array.from(parent.children).find(el => el.tagName === tag.toUpperCase());
  }

  // 1. Header row
  const headerRow = ['Hero (hero14)'];

  // 2. Background image row
  let imageEl = null;
  // Find the grid-layout div
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // Find the first child div (should contain the image)
    const gridDivs = grid.querySelectorAll(':scope > div');
    if (gridDivs.length > 0) {
      // Look for an img inside the first div
      imageEl = gridDivs[0].querySelector('img');
    }
  }
  const imageRow = [imageEl ? imageEl : ''];

  // 3. Content row (title, subheading, cta)
  let contentCell = [];
  // The second grid div contains the content
  if (grid && grid.querySelectorAll(':scope > div').length > 1) {
    const contentDiv = grid.querySelectorAll(':scope > div')[1];
    // Look for heading(s)
    const h1 = getDirectChildByTag(contentDiv.querySelector('.utility-margin-bottom-6rem') || contentDiv, 'h1');
    if (h1) contentCell.push(h1);
    // Optionally, look for subheading, paragraph, or CTA (not present in this example)
    // Look for button group (could contain CTA)
    const buttonGroup = contentDiv.querySelector('.button-group');
    if (buttonGroup && buttonGroup.children.length > 0) {
      contentCell.push(buttonGroup);
    }
  }
  const contentRow = [contentCell.length > 0 ? contentCell : ''];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
