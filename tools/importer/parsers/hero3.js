/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row
  // Find the background image (img.cover-image)
  let bgImg = element.querySelector('img.cover-image');
  // Only include the image if it exists
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  // Find the card containing the text and buttons
  let card = element.querySelector('.card');
  let contentElements = [];
  if (card) {
    // Heading
    const heading = card.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading
    const subheading = card.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // CTA buttons (button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Only include links (a) inside buttonGroup
      const links = Array.from(buttonGroup.querySelectorAll('a'));
      if (links.length) contentElements.push(...links);
    }
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
