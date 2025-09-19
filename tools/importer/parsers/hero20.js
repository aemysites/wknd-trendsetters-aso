/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background image(s) row
  // Find the grid with images
  let backgroundCell = '';
  const gridLayout = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (gridLayout) {
    // Collect all images inside the grid
    const images = Array.from(gridLayout.querySelectorAll('img'));
    if (images.length > 0) {
      backgroundCell = images;
    }
  }

  // 3. Content row (title, subheading, CTA)
  let contentCell = '';
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // We'll collect the heading, subheading, and button group
    const cellContent = [];
    // Heading
    const heading = contentContainer.querySelector('h1');
    if (heading) cellContent.push(heading);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) cellContent.push(subheading);
    // CTA buttons
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) cellContent.push(buttonGroup);
    if (cellContent.length > 0) {
      contentCell = cellContent;
    }
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
