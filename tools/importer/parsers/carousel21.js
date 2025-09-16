/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the deepest card body containing content
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) cardBody = element;

  // Find image (mandatory)
  const img = cardBody.querySelector('img');

  // Find heading (optional)
  let heading = cardBody.querySelector('.h4-heading');
  if (!heading) heading = cardBody.querySelector('h4');

  // Compose text cell
  const textCell = [];
  if (heading) {
    // Convert to semantic heading
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell.push(h2);
  }

  // Table header
  const headerRow = ['Carousel (carousel21)'];
  // Table slide row: [image, text content]
  const slideRow = [img, textCell.length ? textCell : ''];

  const cells = [headerRow, slideRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
