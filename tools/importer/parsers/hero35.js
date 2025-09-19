/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero35)'];

  // 2. Background image row (none in this HTML)
  const backgroundImageRow = [''];

  // 3. Content row: Title, Subheading, CTA
  // Find the grid layout
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = [];
  if (grid) {
    // Find the text container and CTA
    const children = Array.from(grid.children);
    let textBlock = null;
    let cta = null;
    children.forEach((child) => {
      if (child.querySelector('h1, h2, h3, h4, h5, h6')) {
        textBlock = child;
      } else if (child.tagName === 'A') {
        cta = child;
      }
    });
    contentCell = [];
    if (textBlock) contentCell.push(textBlock);
    if (cta) contentCell.push(cta);
  } else {
    // Fallback: just use all children
    contentCell = Array.from(element.children);
  }

  const contentRow = [contentCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundImageRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
