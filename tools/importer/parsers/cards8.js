/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the instructions, must have two columns
  const headerRow = ['Cards (cards8)', ''];

  // Get all direct children (each is a card wrapper with an image inside)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows: each row is [image, alt text as text cell]
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the first image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Clone the image so we don't move it from the DOM
    const imgClone = img.cloneNode(true);
    // Remove empty width/height attributes for clean output
    if (imgClone.hasAttribute('width') && imgClone.getAttribute('width') === '') {
      imgClone.removeAttribute('width');
    }
    if (imgClone.hasAttribute('height') && imgClone.getAttribute('height') === '') {
      imgClone.removeAttribute('height');
    }
    // Use the image alt text as the text cell (plain text)
    const text = img.getAttribute('alt') || '\u00A0';
    return [imgClone, text];
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}
