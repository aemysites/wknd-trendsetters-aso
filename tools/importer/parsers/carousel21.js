/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Carousel (carousel21)'];

  // Defensive: find the image and heading/title
  let img = element.querySelector('img');
  let title = element.querySelector('.h4-heading');

  // First cell: image only
  const imgCell = img;

  // Second cell: text content (title if present)
  let textCell = null;
  if (title) {
    // Wrap title in a div for structure (optional)
    textCell = document.createElement('div');
    textCell.appendChild(title);
  }

  // Compose the table rows
  const rows = [headerRow];
  // Always two columns: image, text (text may be empty)
  rows.push([imgCell, textCell]);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
