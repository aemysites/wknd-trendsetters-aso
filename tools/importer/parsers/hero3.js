/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row
  // Find the image (background)
  let bgImg = null;
  const imgCandidates = element.querySelectorAll('img');
  if (imgCandidates.length > 0) {
    bgImg = imgCandidates[0];
  }

  // 3. Content row (title, subheading, CTA)
  // Find the card with heading, subheading, and buttons
  let contentCell = [];
  // Find the card (contains h1, p, and button group)
  const card = element.querySelector('.card');
  if (card) {
    // Title (h1)
    const h1 = card.querySelector('h1');
    if (h1) contentCell.push(h1);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // CTA buttons
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Clone the button group so we don't move original DOM nodes
      const btnGroupClone = buttonGroup.cloneNode(true);
      contentCell.push(btnGroupClone);
    }
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell.length ? contentCell : ''],
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
