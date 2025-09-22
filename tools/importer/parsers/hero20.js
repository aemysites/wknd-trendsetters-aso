/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const mainGrid = element.querySelector('.grid-layout.desktop-1-column');
  if (!mainGrid) return;

  // Find the image collage grid (background images)
  let imageGrid = mainGrid.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Find the content container (headline, subheading, CTAs)
  let contentContainer = mainGrid.querySelector('.container.small-container');
  let headline = '', subheading = '', ctas = '';
  if (contentContainer) {
    const h1 = contentContainer.querySelector('h1');
    if (h1) headline = h1;
    const p = contentContainer.querySelector('p');
    if (p) subheading = p;
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) ctas = buttonGroup;
  }

  // Compose the table rows
  const headerRow = ['Hero (hero20)'];
  const imageRow = [images.length ? images : ''];
  const contentRow = [[headline, subheading, ctas].filter(Boolean)];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
