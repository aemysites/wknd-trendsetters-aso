/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by tag name
  function getDirectChild(parent, tag) {
    return Array.from(parent.children).find((el) => el.tagName.toLowerCase() === tag);
  }

  // 1. Header row
  const headerRow = ['Hero (hero35)'];

  // 2. Background image row (none in this source)
  const bgImageRow = [''];

  // 3. Content row: Title, Subheading, CTA
  // Find the main grid
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = [];
  if (grid) {
    // The first grid child contains headings and subheading
    const gridChildren = Array.from(grid.children);
    const textDiv = gridChildren[0];
    const ctaEl = gridChildren.find((el) => el.tagName.toLowerCase() === 'a');

    // Title (h2)
    const h2 = textDiv && getDirectChild(textDiv, 'h2');
    if (h2) contentCell.push(h2);
    // Subheading (p)
    const subheading = textDiv && getDirectChild(textDiv, 'p');
    if (subheading) contentCell.push(subheading);
    // CTA button (a)
    if (ctaEl) contentCell.push(ctaEl);
  }
  // Defensive: if nothing found, fallback to all text content
  if (contentCell.length === 0) {
    contentCell = [element.textContent.trim()];
  }

  const contentRow = [contentCell];

  // Assemble table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
