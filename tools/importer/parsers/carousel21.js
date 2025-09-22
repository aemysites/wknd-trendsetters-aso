/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block requirements
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];

  // Defensive: find the image and text content for the slide
  // The structure is: element > div > div.card > div.card-body > .h4-heading + img
  let imageEl = null;
  let titleEl = null;

  // Find the deepest card-body div
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // Find the image
    imageEl = cardBody.querySelector('img');
    // Find the title (optional)
    titleEl = cardBody.querySelector('.h4-heading');
  }

  // Prepare the text cell content
  let textCell = '';
  if (titleEl) {
    // Use a heading element for the title
    const heading = document.createElement('h2');
    heading.textContent = titleEl.textContent;
    textCell = heading;
  }

  // Only add row if image exists (image is mandatory)
  if (imageEl) {
    rows.push([
      imageEl,
      textCell ? textCell : ''
    ]);
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
