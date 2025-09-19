/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Carousel (carousel21)'];

  // Defensive: find the image and text content
  // The structure is: element > div > div.card > div.card-body > (div.h4-heading, img)
  let imgEl = null;
  let titleEl = null;

  // Find the first .card-body in the block
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    imgEl = cardBody.querySelector('img');
    titleEl = cardBody.querySelector('.h4-heading');
  }

  // Prepare the text cell content
  let textCell = '';
  if (titleEl) {
    // Use an h2 for the heading (matches markdown example)
    const h2 = document.createElement('h2');
    h2.textContent = titleEl.textContent;
    textCell = h2;
  }

  // Only create the row if we have an image (mandatory)
  const rows = [headerRow];
  if (imgEl) {
    rows.push([
      imgEl,
      textCell ? textCell : ''
    ]);
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
