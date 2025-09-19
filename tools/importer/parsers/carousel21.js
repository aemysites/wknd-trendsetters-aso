/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];

  // Defensive: Find the card root (may be nested)
  const card = element.querySelector('.card');
  if (!card) {
    // If no card found, do not replace
    return;
  }

  // Find card-body (contains content)
  const cardBody = card.querySelector('.card-body');
  if (!cardBody) {
    return;
  }

  // Find the image (mandatory)
  const img = cardBody.querySelector('img');
  // Defensive: Only proceed if image exists
  if (!img) {
    return;
  }

  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Build the text cell (heading only, as no other text in this HTML)
  let textCell = '';
  if (heading) {
    // Wrap in <h2> for semantic heading
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell = h2;
  }

  // Add the slide row: [image, text cell]
  rows.push([
    img,
    textCell || ''
  ]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
