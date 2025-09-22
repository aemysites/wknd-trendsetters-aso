/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // 1. Header row: always the block name
  const headerRow = ['Hero (hero14)'];

  // 2. Background image row
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    // First grid cell is typically the image container
    const imgContainer = gridDivs[0];
    bgImg = imgContainer.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row: Title, subheading, CTA
  // Find the heading and any buttons inside the second grid cell
  let contentCell = document.createElement('div');
  if (gridDivs.length > 1) {
    const contentContainer = gridDivs[1];
    // Grab heading
    const heading = contentContainer.querySelector('h1');
    if (heading) contentCell.appendChild(heading);
    // Grab subheading (none present in this HTML, but future-proof)
    const subheading = contentContainer.querySelector('h2, h3, h4, h5, h6');
    if (subheading) contentCell.appendChild(subheading);
    // Grab CTA (button or link)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup && buttonGroup.children.length > 0) {
      Array.from(buttonGroup.children).forEach(child => {
        contentCell.appendChild(child);
      });
    }
  }
  // If nothing was appended, fallback to empty string
  const contentRow = [contentCell.childNodes.length ? contentCell : ''];

  // Compose table rows
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
