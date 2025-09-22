/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background image row (row 2)
  // The background is a collage of images from the first grid-layout.desktop-3-column
  // We'll collect all <img> elements inside that grid and put them in a fragment
  let backgroundImages = [];
  const gridLayouts = element.querySelectorAll('.grid-layout.desktop-3-column');
  if (gridLayouts.length > 0) {
    const imgs = gridLayouts[0].querySelectorAll('img');
    backgroundImages = Array.from(imgs);
  }
  // Defensive: if no images found, leave cell empty
  const backgroundRow = [backgroundImages.length ? backgroundImages : ''];

  // 3. Content row (row 3)
  // Title, subheading, CTA buttons are inside .ix-hero-scale-3x-to-1x-content > .container
  let contentCell = '';
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // We'll collect the heading, subheading, and button group
    const parts = [];
    // Heading (h1)
    const h1 = contentContainer.querySelector('h1');
    if (h1) parts.push(h1);
    // Subheading (p.subheading)
    const subheading = contentContainer.querySelector('p.subheading');
    if (subheading) parts.push(subheading);
    // CTA buttons (div.button-group)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) parts.push(buttonGroup);
    if (parts.length) {
      contentCell = parts;
    }
  }
  const contentRow = [contentCell];

  // Assemble the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
