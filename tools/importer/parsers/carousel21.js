/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the innermost .card-body div
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find image (mandatory)
  const img = cardBody.querySelector('img');
  // Reference the existing image element (do not clone or create new)
  const imageCell = img || '';

  // Find heading (optional)
  const heading = cardBody.querySelector('.h4-heading');
  let textCell = '';
  if (heading) {
    // Use semantic heading (h2)
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell = h2;
  }

  // Table header row: block name as specified
  const headerRow = ['Carousel (carousel21)'];
  // Table slide row: [image, text content]
  const slideRow = [imageCell, textCell];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    slideRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
