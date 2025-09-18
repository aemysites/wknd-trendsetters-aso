/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (must match block name exactly)
  const headerRow = ['Hero (hero35)'];

  // Background image row: none in this source, so empty string
  const bgImageRow = [''];

  // Content row: extract heading, subheading, CTA
  let contentCell = '';
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // Find text block (with heading and subheading)
    const textBlock = Array.from(grid.children).find(
      (child) => child.querySelector('h2') || child.querySelector('h1')
    );
    // Find CTA block (a.button)
    const ctaBlock = Array.from(grid.children).find(
      (child) => child.tagName === 'A' && child.classList.contains('button')
    );
    const contentElements = [];
    if (textBlock) {
      // Add all children of textBlock (preserve heading and paragraph)
      contentElements.push(...Array.from(textBlock.children));
    }
    if (ctaBlock) {
      contentElements.push(ctaBlock);
    }
    // Only use referenced elements, not clones or new elements
    contentCell = contentElements.length ? contentElements : '';
  }
  const contentRow = [contentCell];

  // Create table with 1 column and 3 rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  // Replace original element with the table
  element.replaceWith(table);
}
