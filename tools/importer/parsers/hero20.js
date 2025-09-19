/* global WebImporter */
export default function parse(element, { document }) {
  // Find the collage grid of images for the background
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }

  // Find the hero content: headline, subheading, CTA
  const content = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');

  // Table header must exactly match the block name
  const headerRow = ['Hero (hero20)'];

  // Row 2: background image(s) collage
  let bgCell = '';
  if (images.length > 0) {
    // Group all images in a div for layout and semantic clarity
    const collageDiv = document.createElement('div');
    collageDiv.className = 'hero20-background-collage';
    images.forEach(img => collageDiv.appendChild(img));
    bgCell = collageDiv;
  }

  // Row 3: headline, subheading, CTA
  let contentCell = '';
  if (content) {
    contentCell = content;
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgCell],
    [contentCell]
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
