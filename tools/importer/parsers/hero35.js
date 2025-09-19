/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero35)'];

  // 2. Background image row (none in this HTML)
  const bgImageRow = [''];

  // 3. Content row: Title, Subheading, CTA
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = [];
  if (grid) {
    // Get all direct children of the grid
    const gridChildren = Array.from(grid.children);
    // Find the div with the heading and subheading
    const contentDiv = gridChildren.find((child) => child.querySelector('h2'));
    // Find the CTA (button link)
    const ctaLink = gridChildren.find((child) => child.tagName === 'A');

    // Compose content cell
    if (contentDiv) {
      // Get heading and subheading
      const heading = contentDiv.querySelector('h2');
      const subheading = contentDiv.querySelector('p');
      if (heading) contentCell.push(heading);
      if (subheading) contentCell.push(subheading);
    }
    if (ctaLink) {
      contentCell.push(ctaLink);
    }
  }
  // Defensive: if nothing found, just use the whole element
  if (contentCell.length === 0) {
    contentCell = [element];
  }

  const contentRow = [contentCell];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
