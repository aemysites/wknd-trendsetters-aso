/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the images (background collage)
  const imagesGrid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  let backgroundDiv = null;
  if (imagesGrid) {
    backgroundDiv = document.createElement('div');
    backgroundDiv.style.display = 'grid';
    backgroundDiv.style.gridTemplateColumns = 'repeat(3, 1fr)';
    backgroundDiv.style.gap = '0';
    backgroundDiv.style.width = '100%';
    backgroundDiv.style.position = 'relative';
    // Reference (not clone) each image
    imagesGrid.querySelectorAll('img').forEach(img => {
      backgroundDiv.appendChild(img);
    });
  }

  // Find the content container (headline, subheading, CTAs)
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentDiv = null;
  if (contentContainer) {
    contentDiv = document.createElement('div');
    // Heading (h1)
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentDiv.appendChild(h1);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentDiv.appendChild(subheading);
    // CTAs (a.button)
    const btnGroup = contentContainer.querySelector('.button-group');
    if (btnGroup) {
      btnGroup.querySelectorAll('a').forEach(a => {
        contentDiv.appendChild(a);
      });
    }
  }

  // Compose table rows
  const headerRow = ['Hero (hero20)'];
  const backgroundRow = [backgroundDiv || ''];
  const contentRow = [contentDiv || ''];
  const cells = [headerRow, backgroundRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
