/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the hero content
  const grid = element.querySelector('.grid-layout');
  let title = null;
  let subheading = null;
  let cta = null;

  if (grid) {
    // Left column: heading and subheading
    const left = grid.children[0];
    if (left) {
      title = left.querySelector('h2');
      subheading = left.querySelector('p');
    }
    // Right column: CTA button (if present)
    const right = grid.children[1];
    if (right && right.tagName === 'A') {
      cta = right;
    }
  }

  // Table header: must match block name exactly
  const headerRow = ['Hero (hero35)'];
  // Second row: background image (none in this HTML)
  const imageRow = [''];

  // Third row: content (title, subheading, CTA)
  const content = [];
  if (title) content.push(title);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);
  const contentRow = [content];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
