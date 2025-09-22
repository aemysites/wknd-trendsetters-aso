/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row
  // Find the background image (img tag inside the first grid cell)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    // The first grid div contains the background image
    bgImg = gridDivs[0].querySelector('img');
  }

  // 3. Content row: heading, subheading, CTAs
  // The second grid cell contains the card with content
  let contentCell = [];
  if (gridDivs.length > 1) {
    // Find the card inside the second grid cell
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      // Extract heading, subheading, and button group
      const heading = card.querySelector('h1');
      const subheading = card.querySelector('p');
      const buttonGroup = card.querySelector('.button-group');
      // Add them in order if present
      if (heading) contentCell.push(heading);
      if (subheading) contentCell.push(subheading);
      if (buttonGroup) contentCell.push(buttonGroup);
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell.length ? contentCell : ''],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
