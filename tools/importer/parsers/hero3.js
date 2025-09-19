/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row (find the first <img> descendant)
  let backgroundImg = null;
  const img = element.querySelector('img');
  if (img) {
    backgroundImg = img;
  }
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row: heading, subheading, CTA(s)
  // Find the card with the text content
  let contentCell = '';
  const card = element.querySelector('.card');
  if (card) {
    // We'll extract heading, subheading, and button group
    const contentParts = [];
    const h1 = card.querySelector('h1');
    if (h1) contentParts.push(h1);
    const subheading = card.querySelector('.subheading');
    if (subheading) contentParts.push(subheading);
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Only include the links (CTAs), not the container
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length > 0) contentParts.push(...ctas);
    }
    contentCell = contentParts.length ? contentParts : '';
  }
  const contentRow = [contentCell];

  // 4. Build the table
  const rows = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
