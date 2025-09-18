/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero28)'];

  // 2. Background image row
  let imageRowContent = '';
  // The image is nested in: div.ix-parallax-scale-out-hero > img
  const gridDiv = element.querySelector('.w-layout-grid');
  let bgImg = null;
  if (gridDiv) {
    const firstGridCell = gridDiv.children[0];
    if (firstGridCell) {
      const parallaxDiv = firstGridCell.querySelector('.ix-parallax-scale-out-hero');
      if (parallaxDiv) {
        bgImg = parallaxDiv.querySelector('img');
      }
    }
  }
  imageRowContent = bgImg || '';

  // 3. Content row (Heading, subheading, CTA)
  let contentRowContent = '';
  // The heading is in the second grid cell: h1.h1-heading
  let headingDiv = null;
  if (gridDiv && gridDiv.children.length > 1) {
    const secondGridCell = gridDiv.children[1];
    // The heading and button group are inside this cell
    headingDiv = secondGridCell.querySelector('.utility-margin-bottom-6rem');
  }
  contentRowContent = headingDiv || '';

  // Compose table rows
  const rows = [
    headerRow,
    [imageRowContent],
    [contentRowContent],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
