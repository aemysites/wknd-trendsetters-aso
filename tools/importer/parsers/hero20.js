/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all images for the background collage
  function getBackgroundImages() {
    // Find the grid with images
    const grid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
    if (!grid) return [];
    // Get all img elements inside the grid
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper to get the content (title, subheading, buttons)
  function getContentBlock() {
    // Find the content container
    const content = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
    if (!content) return null;
    // We'll collect the heading, subheading, and button group if present
    const children = [];
    const heading = content.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) children.push(heading);
    const subheading = content.querySelector('p');
    if (subheading) children.push(subheading);
    const buttonGroup = content.querySelector('.button-group');
    if (buttonGroup) children.push(buttonGroup);
    return children;
  }

  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background image row (all images as a collage)
  const bgImages = getBackgroundImages();
  let bgCell = '';
  if (bgImages.length > 0) {
    bgCell = bgImages;
  }
  const bgRow = [bgCell];

  // 3. Content row (title, subheading, cta)
  const contentBlock = getContentBlock();
  const contentRow = [contentBlock ? contentBlock : ''];

  // Compose table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
