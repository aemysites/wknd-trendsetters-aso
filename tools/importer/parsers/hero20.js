/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background image(s) row
  // Find the grid with images
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }

  // Defensive: if no images found, leave cell empty
  const backgroundCell = images.length > 0 ? images : [''];

  // 3. Content row (title, subheading, CTA)
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentCell = [''];
  if (contentContainer) {
    // We'll collect: h1, p, and all links (CTAs)
    const content = [];
    const h1 = contentContainer.querySelector('h1');
    if (h1) content.push(h1);
    const p = contentContainer.querySelector('p');
    if (p) content.push(p);
    // Get all CTA links
    const ctas = Array.from(contentContainer.querySelectorAll('a'));
    if (ctas.length > 0) {
      // Wrap CTAs in a div for layout
      const ctaDiv = document.createElement('div');
      ctaDiv.append(...ctas);
      content.push(ctaDiv);
    }
    contentCell = content.length > 0 ? content : [''];
  }

  // Build the table
  const rows = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
