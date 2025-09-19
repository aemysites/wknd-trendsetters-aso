/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Carousel (carousel21)'];

  // Find the card body containing the image and heading
  const cardBody = element.querySelector('.card-body');
  let imgEl = null;
  let textCell = '';

  if (cardBody) {
    imgEl = cardBody.querySelector('img');
    const heading = cardBody.querySelector('.h4-heading');
    if (heading) {
      textCell = heading;
    }
  }

  // Only add a slide row if there is an image
  const rows = [headerRow];
  if (imgEl) {
    rows.push([
      imgEl,
      textCell ? [textCell] : ''
    ]);
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
