/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row
  // Find the background image (img tag)
  let bgImg = element.querySelector('img.cover-image');
  // Defensive: if not found, try any img
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  // Only include the image element itself
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: headline, subheading, CTA(s)
  // Find the card containing text and buttons
  let card = element.querySelector('.card');
  let contentCell = [];
  if (card) {
    // Find headline
    const headline = card.querySelector('h1');
    if (headline) contentCell.push(headline);
    // Find subheading (p.subheading)
    const subheading = card.querySelector('p.subheading');
    if (subheading) contentCell.push(subheading);
    // Find button group (call-to-actions)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Only include the links inside button group
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) {
        // Wrap CTAs in a div for grouping
        const ctaDiv = document.createElement('div');
        ctaDiv.append(...ctas);
        contentCell.push(ctaDiv);
      }
    }
  }
  // Defensive: if nothing found, use empty string
  if (!contentCell.length) contentCell = [''];
  const contentRow = [contentCell];

  // 4. Compose table rows
  const rows = [headerRow, bgImgRow, contentRow];

  // 5. Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace original element
  element.replaceWith(block);
}
