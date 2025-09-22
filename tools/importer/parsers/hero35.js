/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name
  const headerRow = ['Hero (hero35)'];

  // 2. Background image row (none in this HTML)
  const backgroundImageRow = [''];

  // 3. Content row: heading, subheading, CTA
  // Find the grid layout
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = [];
  if (grid) {
    // The first grid child: text content (heading, subheading)
    const gridChildren = grid.querySelectorAll(':scope > *');
    if (gridChildren.length > 0) {
      const textCol = gridChildren[0];
      // Heading (h2)
      const heading = textCol.querySelector('h2');
      if (heading) contentCell.push(heading);
      // Subheading (p)
      const subheading = textCol.querySelector('p');
      if (subheading) contentCell.push(subheading);
    }
    // The second grid child: CTA button (a)
    if (gridChildren.length > 1) {
      const cta = gridChildren[1];
      if (cta && cta.tagName === 'A') contentCell.push(cta);
    }
  }
  // Defensive fallback: if nothing found, put empty string
  if (contentCell.length === 0) contentCell = [''];

  const contentRow = [contentCell];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundImageRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
