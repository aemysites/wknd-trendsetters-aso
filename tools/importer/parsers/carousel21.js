/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the innermost .card-body div
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Extract image (mandatory)
  const img = cardBody.querySelector('img');
  // Defensive: Only reference the existing image element

  // Extract heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose text cell
  const textCell = [];
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell.push(h2);
  }
  // No description or CTA present in this source

  // Build table rows
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];
  rows.push([
    img,
    textCell.length ? textCell : ''
  ]);

  // Create block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
