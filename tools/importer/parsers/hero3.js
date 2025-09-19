/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row
  // Find the background image (img.cover-image)
  let bgImg = element.querySelector('img.cover-image');
  let bgImgCell = '';
  if (bgImg) {
    bgImgCell = bgImg;
  }

  // 3. Content row (title, subheading, CTA)
  // Find the card that contains the text content
  let card = element.querySelector('.card');
  let contentCell = '';
  if (card) {
    // Extract heading, subheading, and button group
    const content = [];
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) content.push(heading);
    const subheading = card.querySelector('p.subheading');
    if (subheading) content.push(subheading);
    const btnGroup = card.querySelector('.button-group');
    if (btnGroup) content.push(btnGroup);
    contentCell = content;
  }

  // Build the table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
