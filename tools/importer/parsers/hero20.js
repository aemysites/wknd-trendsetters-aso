/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Find background images (all <img> in the grid-layout)
  let bgImages = [];
  const gridLayouts = element.querySelectorAll('.grid-layout.desktop-3-column');
  gridLayouts.forEach(grid => {
    grid.querySelectorAll('img').forEach(img => {
      bgImages.push(img);
    });
  });

  // Defensive: if no images found, try fallback
  if (bgImages.length === 0) {
    element.querySelectorAll('img').forEach(img => {
      bgImages.push(img);
    });
  }

  // 3. Find content: h1, subheading, and CTAs
  let contentCell = [];
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content, .container.small-container');
  if (contentContainer) {
    // Heading
    const heading = contentContainer.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // CTAs (buttons/links)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // All links in the button group
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length > 0) contentCell.push(...ctas);
    }
  }

  // 4. Build table rows
  const rows = [
    headerRow,
    [bgImages],
    [contentCell]
  ];

  // 5. Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
