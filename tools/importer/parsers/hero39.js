/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if element is a header with expected structure
  if (!element || !element.querySelector) return;

  // --- 1. Header row ---
  const headerRow = ['Hero (hero39)'];

  // --- 2. Background image row ---
  // Find the main image (background asset)
  let imgEl = element.querySelector('img.cover-image');
  // Defensive: If not found, try any img
  if (!imgEl) imgEl = element.querySelector('img');
  // Only include the image element itself
  const imageRow = [imgEl ? imgEl : ''];

  // --- 3. Content row ---
  // Find the headline, paragraph, and CTA
  // The headline is the h1
  const h1 = element.querySelector('h1');
  // Paragraph and button are inside .flex-vertical
  const flexVertical = element.querySelector('.flex-vertical');
  let paragraph = '';
  let button = '';
  if (flexVertical) {
    paragraph = flexVertical.querySelector('p');
    button = flexVertical.querySelector('a');
  }

  // Compose the content cell
  // Only include elements that exist
  const contentCell = [];
  if (h1) contentCell.push(h1);
  if (paragraph) contentCell.push(paragraph);
  if (button) contentCell.push(button);

  // If nothing found, fallback to all text content
  if (contentCell.length === 0) {
    contentCell.push(document.createTextNode(element.textContent.trim()));
  }

  // Table rows: header, image, content
  const cells = [
    headerRow,
    imageRow,
    [contentCell]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
