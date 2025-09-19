/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Header row ---
  const headerRow = ['Hero (hero3)'];

  // --- 2. Background image row ---
  // Find the image element (background)
  let imgEl = null;
  const img = element.querySelector('img');
  if (img) {
    imgEl = img;
  }
  const imageRow = [imgEl ? imgEl : ''];

  // --- 3. Content row ---
  // Find the card with heading, subheading, buttons
  let cardDiv = element.querySelector('.card');

  // Defensive: If not found, fallback to first div with heading
  if (!cardDiv) {
    for (const div of element.querySelectorAll('div')) {
      if (div.querySelector('h1')) {
        cardDiv = div;
        break;
      }
    }
  }

  // Compose content cell: heading, subheading, buttons
  const contentCell = [];
  if (cardDiv) {
    // Heading
    const heading = cardDiv.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Subheading (paragraph)
    const subheading = cardDiv.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // Button group
    const buttonGroup = cardDiv.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      contentCell.push(...buttons);
    }
  }
  if (contentCell.length === 0) contentCell.push('');
  const contentRow = [contentCell];

  // --- Compose table ---
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // --- Replace original element ---
  element.replaceWith(table);
}
